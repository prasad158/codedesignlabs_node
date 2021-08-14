import jwt, { decode } from "jsonwebtoken";
import { TOKEN_KEY } from "@config/constants";

const token_key = process.env.TOKEN_KEY || TOKEN_KEY;

export default class JWTUtil {

    static generateToken(data: any) {
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

    static verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, token_key);
            console.log(decoded);
            return true;
        } catch (err) {
            return false;
        }
    }

}