import jwt, { decode } from "jsonwebtoken";
import { TOKEN_KEY } from "@config/constants";
import { IUserInfoModel } from "@models/UserInfoModel";

const token_key = process.env.TOKEN_KEY || TOKEN_KEY;

export default class JWTUtil {

    static generateToken(data: any): string {
        try {
            const token = jwt.sign(
                data,
                token_key
            );

            return token;
        } catch (err) {
            throw err;
        }
    }

    static verifyToken(token: string): boolean {
        try {
            jwt.verify(token, token_key);
            return true;
        } catch (err) {
            return false;
        }
    }

    static decodeToken(token: string): any {
        try {
            const decoded = jwt.verify(token, token_key);
            return decoded;
        } catch (err) {
            return false;
        }
    }

}