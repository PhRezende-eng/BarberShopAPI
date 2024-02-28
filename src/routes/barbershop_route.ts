import { Request, Response, Router } from "express";

import ApiResponse from '../models/response';
import BarbershopController from "../controllers/barbershop_controller";

const router = Router();

router.get('/barbershop', async (req: Request, res: Response) => {
    try {
        const { user_id } = req.query;
        const response = await BarbershopController.getBabrbershop(typeof user_id === 'string' ? user_id : undefined);
        return res.json(response);
    } catch (error) {
        const response = ApiResponse.error(String(error));
        return res.status(response.status_code!).json(response);
    }
})


export default router;