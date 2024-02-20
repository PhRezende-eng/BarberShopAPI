import { Request, Response } from 'express';
import TestConnection from '../controllers/test_controller';
import ApiResponse from '../models/response';
import express from 'express';
import { htmlTemplate } from './index.html'

const router = express.Router()

router.get('/test_consult', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testGetData();
    response.data = result;
    return res.json(response);
});

router.get('/test_html', async (req: Request, res: Response) => {
    // const response = new ApiResponse();
    // const result = await TestConnection.testGetData();
    // response.data = result;
    return res.send(htmlTemplate);
});

router.get('/test_insert', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testPostData();
    response.data = result;
    return res.json(response);
});

router.get('/test_drop', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testDeletAll();
    response.data = result;
    return res.json(response);
});


export default router;