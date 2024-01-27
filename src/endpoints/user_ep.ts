import app from "../server";
import { Request, Response } from 'express';
import UserController from '../controllers/user_controller';
import ApiResponse from '../models/response';

app.post('/auth', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await UserController.createAuthUser();
    response.data = result;
    res.json(response);
});