import express, { Request, Response } from 'express';
import testConnection from './test_connection';
import * as data from "./data.json";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.listen(
    3000,
    () => console.log("Server is running at PORT 3000 🚀 \n on http://localhost:3000")
)

const BSResponse = {
    "data": "" || {},
    "statusCode": 200,
    "statusMessage": "ok",
}

app.get('/api', (req: Request, res: Response) => {
    let response = BSResponse;
    response["data"] = data;
    res.json(response);
});

app.get('/test-consult', async (req: Request, res: Response) => {
    const response = BSResponse;
    const result = await testConnection.testGetData();
    response["data"] = result;
    res.json(response);
});

app.get('/test-insert', async (req: Request, res: Response) => {
    let response = BSResponse;
    const result = await testConnection.testPostData();
    response["data"] = result;
    res.json(response);
});

app.get('/test-drop', async (req: Request, res: Response) => {
    const response = BSResponse;
    const result = await testConnection.testDeletAll();
    response["data"] = result;
    res.json(response);
});