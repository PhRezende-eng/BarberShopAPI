import prisma from '../db/prisma_connection';
import ApiResponse from '../models/response';
import apiToken from '../utils/token';

class UserController {

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
                response.access_token = apiToken.createAccessToken(id);
                response.refresh_token = apiToken.createRefreshToken(id);
                response.type = "Bearer"
            } else {
                response.data = "Usuário não encontrado";
                response.status_code = 201;
            }

            return response;
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