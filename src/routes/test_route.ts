import { Request, Response } from 'express';
import TestConnection from '../controllers/test_controller';
import ApiResponse from '../models/response';
import express from 'express';

const router = express.Router()

router.get('/test-consult', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testGetData();
    response.data = result;
    res.json(response);
});

router.get('/test-insert', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testPostData();
    response.data = result;
    res.json(response);
});

router.get('/test-drop', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testDeletAll();
    response.data = result;
    res.json(response);
});


export default router;