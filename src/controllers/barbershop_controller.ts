import ApiResponse from '../models/response';
import prisma from '../db/prisma_connection';
import { Barbershop } from '@prisma/client';
import { BarbershopModel } from '../models/barbershop';


class BarbershopController {

    static getBarbershopModel(barbershop: Barbershop): BarbershopModel {
        return new BarbershopModel(
            barbershop.id,
            barbershop.name,
            barbershop.user_id,
            barbershop.email,
            barbershop.opening_day,
            barbershop.opening_hours,
        );
    }

    static async getBarbershopFromDB(userId?: number, barbershopId?: number): Promise<Barbershop | Barbershop[] | null> {
        try {

            if (userId != null) {
                return await prisma.barbershop.findMany(
                    {
                        where: { user_id: userId }
                    }
                )
            }
            if (barbershopId != null) {
                return await prisma.barbershop.findFirst(
                    {
                        where: { id: barbershopId }
                    }
                )
            }


            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getBabrbershop(userId?: number, barbershopId?: number): Promise<ApiResponse> {
        if (userId != null) {
            const barbershops = await BarbershopController.getBarbershopFromDB(userId, undefined) as Barbershop[] | null;

            if (barbershops) {
                const barbershopModels = [];
                for (const barbershop of barbershops) {
                    barbershopModels.push(BarbershopController.getBarbershopModel(barbershop));
                }
                return new ApiResponse(barbershopModels);
            }

            return ApiResponse.error(`Barbershop not found with user id ${userId}`, 403);
        }

        if (barbershopId != null) {
            const barbershop = await BarbershopController.getBarbershopFromDB(undefined, barbershopId) as Barbershop | null;

            if (barbershop) {
                const barbershopModel = BarbershopController.getBarbershopModel(barbershop);
                return new ApiResponse(barbershopModel);
            }

            return ApiResponse.error(`Barbershop not found with barbershop_id ${barbershop}`, 403);
        }

        return ApiResponse.error(`Send barbershop_id or user_id`, 403);
    }
}

export default BarbershopController;