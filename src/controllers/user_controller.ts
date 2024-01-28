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
                response.access_token = apiToken.createAccessToken(user.id);
                response.refresh_token = apiToken.createRefreshToken(user.id);
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
}

export default UserController;