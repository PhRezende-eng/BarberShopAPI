import { Request, Response, Router } from "express";

import ApiResponse from '../models/response';
import BarbershopController from "../controllers/barbershop_controller";
import ValidateApiTokenMD from "../middlewares/validate_token";

const router = Router();


router.get('/barbershop', ValidateApiTokenMD.validateAccessToken, async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;
        const { barbershop_id } = req.query;

        if (user_id == null && barbershop_id == null) {
            const response = ApiResponse.error("User id or Barbershop id should be passed", 402);
            return res.status(response.status_code).json(response);
        }

        if (user_id != null && barbershop_id != null) {
            const response = ApiResponse.error("Choose pass one query, User ID or Barbershop ID", 402);
            return res.status(response.status_code).json(response);
        }

        const response = await BarbershopController.getBabrbershop(
            typeof user_id === 'string' ? Number(user_id) : undefined,
            typeof barbershop_id === 'string' ? Number(barbershop_id) : undefined,
        );

        return res.json(response);
    } catch (error) {
        const response = ApiResponse.error(String(error));
        return res.status(response.status_code!).json(response);
    }
})


export default router;