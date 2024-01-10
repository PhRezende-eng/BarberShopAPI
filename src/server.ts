import express, { Request, Response } from 'express';
import * as data from "./data.json";

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
    BSResponse["data"] = data;
    res.json(BSResponse);
});