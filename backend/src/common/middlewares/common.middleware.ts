import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";

function checkUserPermissions(permission_name: string) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.user, permission_name);
            if (!req.user.permissions[permission_name]) {
                res.sendRes(HttpStatus.FORBIDDEN, { success: false, msg: 'Forbidden!!' });
                return;
            }
            next();
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }
}

export {
    checkUserPermissions
}
