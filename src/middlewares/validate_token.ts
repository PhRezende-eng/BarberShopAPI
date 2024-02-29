import { Response, Request, NextFunction } from "express";
import dotenv from 'dotenv';
import TokenUtil from '../utils/token';
import ApiResponse from '../models/response';


dotenv.config();

class ValidateApiTokenMD {
    validateAccessToken = (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

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