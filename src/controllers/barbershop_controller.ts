import ApiResponse from '../models/response';
import prisma from '../db/prisma_connection';

class BarberShopController {

    //TODO: create function to return a barberShopModel

    static async getBarberShopFromDB(userId: number) {
        try {
            const barberShop = await prisma.barbershop.findFirst(
                {
                    where: {
                        user_id: userId
                    }
                }
            )
            console.log(barberShop)
        } catch (error) {
            throw error;
        }
    }

    static async getBabrbershop(userId?: number): Promise<ApiResponse> {
        const response = new ApiResponse();
        if (userId != null) {
            await BarberShopController.getBarberShopFromDB(userId);
        }
        return response;
    }
}

export default BarberShopController;