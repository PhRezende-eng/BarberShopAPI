import { Secret, sign, verify } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

class ApiToken {
    private secret?: Secret;

    constructor() {
        this.secret = process.env.SECRET_JWT;
    }

    createAccessToken = (id: number) => {
        const token = sign({ id }, this.secret ?? "", {
            expiresIn: 60 * 5,
        });
        return token;
    };

    createRefreshToken = (id: number) => {
        const token = sign({ id }, this.secret ?? "", {
            expiresIn: 60 * 60,
            // algorithm: 'RS256',
        });
        return token;
    };

    verifyToken = (token: string) => {
        try {
            return verify(token, this.secret ?? "");
        } catch (error) {
            throw "Token inválido";
        }
    }

    verifyRefreshToken = (token: string) => {
        try {
            return verify(
                token, this.secret ?? "",
                // { algorithms: ['RS256'] },
            );
        } catch (error) {
            throw "Token inválido";
        }
    }
}

const apiToken = new ApiToken();

export default apiToken;