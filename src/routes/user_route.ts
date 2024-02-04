import { Request, Response } from 'express';
import UserController from '../controllers/user_controller';
import ApiResponse from '../models/response';
import express from 'express';
import ValidateTokenMiddleware from "../middlewares/validate_token";

const router = express.Router()

router.post('/auth', async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
            const response = ApiResponse.error("Forbidden Access", 403);
            return res.status(response.status_code).json(response);
        }

        const response = await UserController.createAuthUser(email, password);
        return res.json(response);
    } catch (error) {
        const response = ApiResponse.error(String(error));
        return res.status(response.status_code!).json(response);
    }
});

router.use([ValidateTokenMiddleware.validateAccessToken]);

router.get('/verify_token', async (req: Request, res: Response) => {
    try {
        const access_token = req.body.access_token;
        const refresh_token = req.body.refresh_token;

        if (!access_token || !refresh_token) {
            const response = ApiResponse.error("Forbidden Access", 403);
            return res.status(response.status_code).json(response);
        }

        const response = await UserController.verifyToken(access_token, refresh_token);
        return res.json(response);
    } catch (error) {
        const response = ApiResponse.error(String(error));
        return res.status(response.status_code!).json(response);
    }
});


router.get('/me', async (req: Request, res: Response) => {
    try {
        const access_token = res.locals.access_token;
        const response = await UserController.getUserByAccessToken(access_token);
        return res.json(response);
    } catch (error) {
        const response = ApiResponse.error(String(error));
        return res.status(response.status_code).json(response);
    }
});


export default router;