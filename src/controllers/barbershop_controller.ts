import ApiResponse from '../models/response';
import prisma from '../db/prisma_connection';

class BarbershopController {
    static async getBabrbershop(userId?: string): Promise<ApiResponse> {
        const response = new ApiResponse();

        return response;
    }
}

export default BarbershopController;