import prisma from '../db/prisma_connection';
import ApiResponse from '../models/response';
import apiToken from '../utils/token';
import { Barbershop, Prisma, User, UserADM, UserEmployee } from '@prisma/client'
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

    private static getUserModelByType(user: User, userByType: UserEmployee | UserADM, profile: string, barberShopId?: number) {
        if (profile == "A") {
            const userModel = new UserADMModel(
                user.id,
                user.name,
                user.email,
                user.profile,
                user.avatar,
                userByType.work_days,
                userByType.work_hours,
            );
            return userModel;
        } else {
            const userModel = new UserEmployeeModel(
                user.id,
                user.name,
                user.email,
                barberShopId!,
                userByType.work_days,
                userByType.work_hours,
                user.profile,
                user.avatar,
            );
            return userModel;
        }
    }

    static async createAuthUser(email: string, password: string): Promise<any> {
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
                const id = `${user.id}${user.email}${user.password}`;

                const access_token = apiToken.createAccessToken(id);
                const refresh_token = apiToken.createRefreshToken(id);

                response.access_token = access_token;
                response.refresh_token = refresh_token;
                response.type = "Bearer"

                await UserController.insertTokenUserOnDB(access_token, refresh_token, user.id);

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

    static async verifyToken(accessToken: string, refreshToken: string): Promise<any> {

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


    static async getUserByAccessToken(accessToken: string): Promise<any> {
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

            const userByType = await UserController.getUserRemaingDataByProfileType(user.id, user.profile);

            if (!userByType) {
                response.data = "Usuário não encontrado";
                response.status_code = 201;
                return response;
            }

            if (user.profile == "A") {
                const userModel = UserController.getUserModelByType(user, userByType, user.profile);
                response.data = userModel;
                return response;
            } else {
                const barberShop = await UserController.getBarberShopFromDB((userByType as UserEmployee).barber_shop_id);

                if (!barberShop) {
                    response.data = "Barbearia relacionada não encontrada";
                    response.status_code = 201;
                    return response;
                }

                const userModel = UserController.getUserModelByType(user, userByType, user.profile, barberShop?.id);
                response.data = userModel;
                return response;
            }


        } catch (error) {
            throw error;
        }
    }
}

export default UserController;