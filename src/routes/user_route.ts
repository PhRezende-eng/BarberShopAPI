import { Request, Response } from 'express';
import UserController from '../controllers/user_controller';
import ApiResponse from '../models/response';
import express from 'express';

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const response = await UserController.createAuthUser(email, password);
        res.json(response);
    } catch (error) {
        const response = ApiResponse.error(String(error));
        res.json(response);
    }
});


export default router;