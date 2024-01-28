import jwt, { JwtPayload, Secret, sign, verify } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

class ApiToken {
    private secret?: Secret;

    constructor() {
        this.secret = process.env.SECRET_JWT;
    }

    createAccessToken = (id: string) => {
        const token = sign({ id }, this.secret ?? "", {
            expiresIn: 60 * 5,
        });
        return token;
    };

    createRefreshToken = (id: string) => {
        const token = sign({ id }, this.secret ?? "", {
            expiresIn: 60 * 60,
            // algorithm: 'RS256',
        });
        return token;
    };


    verifyAccessToken = (token: string) => {
        try {
            const verificationResponse = verify(
                token, this.secret ?? "",
                // { algorithms: ['RS256'] },
            );

            if (typeof verificationResponse === "object") {
                return "token_success";
            } else {
                return "token_expired";
            }
        } catch (error) {
            return "token_invalid";
        }
    }

    verifyRefreshToken = (token: string) => {
        try {
            const verificationResponse = verify(
                token, this.secret ?? "",
                // { algorithms: ['RS256'] },
            );

            if (typeof verificationResponse === "object") {
                return "token_success";
            } else {
                return "token_expired";
            }

        } catch (error) {
            return "token_invalid";
        }
    }
}

const apiToken = new ApiToken();

export default apiToken;