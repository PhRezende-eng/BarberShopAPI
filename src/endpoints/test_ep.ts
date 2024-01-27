import app from "../server";
import { Request, Response } from 'express';
import TestConnection from '../controllers/test_controller';
import ApiResponse from '../models/response';

app.get('/test-consult', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testGetData();
    response.data = result;
    console.log(response.data);
    res.json(response);
});

app.get('/test-insert', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testPostData();
    response.data = result;
    res.json(response);
});

app.get('/test-drop', async (req: Request, res: Response) => {
    const response = new ApiResponse();
    const result = await TestConnection.testDeletAll();
    response.data = result;
    res.json(response);
});