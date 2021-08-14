import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import JWTUtil from "@utils/jwt.util";

function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.headers.authorization || '';
        if (!token) {
            res.sendRes(HttpStatus.UNAUTHORIZED, { success: false, msg: 'Unauthorized Access!!!' });
            return;
        }

        token = token.split("Bearer ").join("");

        const verify = JWTUtil.verifyToken(token);
        if (!verify) {
            res.sendRes(HttpStatus.UNAUTHORIZED, { success: false, msg: 'Unauthorized Access!!!' });
            return;
        }

        next();
    } catch (err) {
        res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, msg: "" });
    }
}

function getUserFromToken(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.headers.authorization || '';
        token = token.split("Bearer ").join("");

        const user_data = JWTUtil.decodeToken(token);
        req.user = user_data;

        next();
    } catch (err) {
        res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, msg: "" });
    }
}

export {
    verifyToken,
    getUserFromToken
}