import jwt, { JwtPayload, Secret, sign, verify } from "jsonwebtoken";
import { Response, Request } from "express";
import dotenv from 'dotenv';
import TokenUtil from '../utils/token';
import ApiResponse from '../models/response';


dotenv.config();

class ValidateApiTokenMD {
    validateAccessToken = (req: Request, res: Response, next: any) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        console.log("Checking Token")


        if (!token) {
            const response = ApiResponse.error("Token não informado", 401);
            return res.status(response.status_code).json(response);
        }

        const responseTokenValidate = TokenUtil.verifyAccessToken(token);

        if (responseTokenValidate != "token_success") {
            const response = ApiResponse.error(responseTokenValidate, 403);
            return res.status(response.status_code).json(response);
        }

        res.locals.access_token = token;

        next();
    }
}

const apiToken = new ValidateApiTokenMD();

export default apiToken;    