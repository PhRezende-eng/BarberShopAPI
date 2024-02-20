import prisma from '../db/prisma_connection';
import ApiResponse from '../models/response';
import apiToken from '../utils/token';
import { Barbershop, Profile, User, UserADM, UserEmployee } from '@prisma/client'
import { UserADMModel, UserEmployeeModel } from '../models/user';

class UserController {


    private static async insertTokenUserOnDB(access_token: string, refresh_token: string, user_id: number) {

        try {
            const token = await prisma.token.findFirst(
                {
                    where: {
                        user_id: user_id,
                    }
                }
            );

            if (!token) {
                await prisma.token.create(
                    {
                        data: {
                            access_token: access_token,
                            refresh_token: refresh_token,
                            user_id: user_id,
                        }
                    }
                );
            } else {
                await prisma.token.update(
                    {
                        where: {
                            user_id: user_id,
                        },

                        data: {
                            access_token: access_token,
                            refresh_token: refresh_token,
                        }
                    }
                );
            }
        } catch (error) {
            throw error;
        }

    }

    private static async insertUserOnDB(userData: any): Promise<User> {
        //TODO: TREAT if not exists
        try {
            const user = await prisma.user.create(
                {
                    data: {
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                        avatar: userData.avatar,
                        profile: userData.profile == 'A' ? Profile.A : Profile.E,
                    },
                }
            );
            return user;
        } catch (error) {
            throw error;
        }
    }

    private static async insertUserWithProfileOnDB(userId: number, userData: any): Promise<UserADM | UserEmployee> {
        try {
            if (userData.profile == 'A') {
                const userByProfile = await prisma.userADM.create({
                    data: {
                        user_id: userId,
                        work_days: userData.work_days,
                        work_hours: userData.work_hours,
                    }
                });
                return userByProfile;
            } else {
                const userByProfile = await prisma.userEmployee.create({
                    data: {
                        user_id: userId,
                        work_days: userData.work_days,
                        work_hours: userData.work_hours,
                        barber_shop_id: userData.barber_shop_id,
                    }
                });
                return userByProfile;
            }
        } catch (error) {
            throw error;
        }
    }

    private static async getBarberShopFromDB(barber_shop_id: number): Promise<Barbershop | null> {
        try {
            const user = await prisma.barbershop.findFirst(
                {
                    where: {
                        id: barber_shop_id,
                    }
                }
            );
            return user;
        } catch (error) {
            throw error;
        }
    }


    private static async getUserRemaingDataByProfileType(userId: number, userType: string): Promise<UserADM | UserEmployee | null> {

        try {
            let user;
            if (userType == "A") {
                user = await prisma.userADM.findFirst(
                    {
                        where: {
                            user_id: userId,
                        }
                    }
                );
            } else {
                user = await prisma.userEmployee.findFirst(
                    {
                        where: {
                            user_id: userId,
                        }
                    }
                );
            }
            return user;
        } catch (error) {
            throw error;
        }

    }

    static getUserModelByProfile(user: User, userByProfile: UserEmployee | UserADM) {
        if (user.profile == Profile.A) {
            const userModel = new UserADMModel(
                user.id,
                user.name,
                user.email,
                user.profile,
                user.password,
                user.avatar,
                userByProfile.work_days,
                userByProfile.work_hours,
            );
            return userModel;
        }

        if (user.profile == Profile.E) {
            {
                const userModel = new UserEmployeeModel(
                    user.id,
                    user.name,
                    user.email,
                    (userByProfile as UserEmployee).barber_shop_id,
                    userByProfile.work_days,
                    userByProfile.work_hours,
                    user.profile,
                    user.password,
                    user.avatar,
                );
                return userModel;
            }
        }

        return null;
    }

    static generateAllTokens(user: User) {
        // TODO: Should not use password to generate token id
        const id = `${user.id}${user.email}${user.name}`;

        const access_token = apiToken.createAccessToken(id);
        const refresh_token = apiToken.createRefreshToken(id);
        return { access_token, refresh_token };
    }

    static async createAuthUser(email: string, password: string): Promise<ApiResponse> {
        try {

            const response = new ApiResponse();
            const user = await prisma.user.findFirst(
                {
                    where: {
                        email: email,
                        password: password,
                    }
                }
            );

            if (user) {
                const userTokens = UserController.generateAllTokens(user);

                response.access_token = userTokens.access_token;
                response.refresh_token = userTokens.refresh_token;
                response.type = "Bearer"

                await UserController.insertTokenUserOnDB(userTokens.access_token, userTokens.refresh_token, user.id);

                return response;
            } else {
                response.data = "Usuário não encontrado";
                response.status_code = 201;
                return response;
            }


        } catch (error) {
            throw error;
        }
    }

    static async createUser(userData: any): Promise<ApiResponse> {
        try {
            const response = new ApiResponse();

            if (userData.profile != 'E' && userData.profile != 'A') {
                return ApiResponse.error("Choose one type of profile", 403);
            }

            if (userData.profile == 'E') {
                if (!userData.barber_shop_id) {
                    return ApiResponse.error("Employee user should select a barber shop", 403);
                }
                if (!userData.work_days || !userData.work_hours) {
                    return ApiResponse.error("Fields required not used, user employee may be contain work days and work hours", 403);
                }

                const barberShop = await UserController.getBarberShopFromDB(userData.barber_shop_id);

                if (!barberShop) {
                    return ApiResponse.error(`Barber shop not found with ID ${userData.barber_shop_id}`, 402);
                }
            }


            const user = await UserController.insertUserOnDB(userData);
            const userProfile = await UserController.insertUserWithProfileOnDB(user.id, userData);
            const userByProfileModel = UserController.getUserModelByProfile(user, userProfile);

            const userTokens = UserController.generateAllTokens(user);

            response.access_token = userTokens.access_token;
            response.refresh_token = userTokens.refresh_token;
            response.data = userByProfileModel ?? "User profile not defined";

            return response;
        } catch (error) {
            throw error;
        }

    }

    static async verifyToken(accessToken: string, refreshToken: string): Promise<ApiResponse> {

        try {
            const response = new ApiResponse();

            const validateRefreshToken = apiToken.verifyRefreshToken(refreshToken);
            const validateAccessToken = apiToken.verifyAccessToken(accessToken);

            if (!validateAccessToken) response.status_code = 201;

            response.access_token = validateAccessToken;
            response.refresh_token = validateRefreshToken;

            return response;
        } catch (error) {
            throw error;
        }
    }


    static async getUserByAccessToken(accessToken: string): Promise<ApiResponse> {
        try {
            const response = new ApiResponse();

            const user_token = await prisma.token.findFirst(
                {
                    where: {
                        access_token: accessToken,
                    }
                }
            );

            if (!user_token) {
                response.data = "Token não encontrado";
                response.status_code = 203;
                return response;
            }

            const user = await prisma.user.findFirst(
                {
                    where: {
                        id: user_token.user_id,
                    }
                }
            );

            if (!user) {
                response.data = "Usuário não encontrado";
                response.status_code = 201;
                return response;
            }

            const userByProfile = await UserController.getUserRemaingDataByProfileType(user.id, user.profile);

            if (!userByProfile) {
                response.data = "Usuário não encontrado";
                response.status_code = 201;
                return response;
            }

            if (user.profile == "A") {
                const userModel = UserController.getUserModelByProfile(user, userByProfile);

                if (!userModel) {
                    response.data = "Perfil de usuário incorreto";
                    response.status_code = 201;
                    return response;
                }

                response.data = userModel;
                return response;
            }

            const barberShop = await UserController.getBarberShopFromDB((userByProfile as UserEmployee).barber_shop_id);

            if (!barberShop) {
                response.data = "Barbearia relacionada não encontrada";
                response.status_code = 201;
                return response;
            }

            const userModel = UserController.getUserModelByProfile(user, userByProfile);

            if (!userModel) {
                response.data = "Perfil de usuário incorreto";
                response.status_code = 201;
                return response;
            }

            response.data = userModel;
            return response;


        } catch (error) {
            throw error;
        }
    }
}

export default UserController;