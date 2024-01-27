import express, { Request, Response } from 'express';
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.listen(
    3000,
    () => console.log("Server is running at PORT 3000 🚀 \n on http://localhost:3000")
)

export default app;




