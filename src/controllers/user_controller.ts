import prisma from '../db/prisma_connection';
import ApiResponse from '../models/response';
import apiToken from '../utils/token';

class UserController {


    private static async createTokenOnTable(access_token: string, refresh_token: string, id: string) {
        if (access_token && refresh_token && id) {
            await prisma.token.create(
                {
                    data: {
                        access_token: access_token,
                        refresh_token: refresh_token,
                        user_id: id,
                    }
                }
            );
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

                UserController.createTokenOnTable(access_token, refresh_token, id);

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
}

export default UserController;