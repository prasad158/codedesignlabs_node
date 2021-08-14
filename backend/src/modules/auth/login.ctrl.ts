import { Request, Response, NextFunction } from "express";
import UserInfoModel from "@models/UserInfoModel";
import HttpStatus from "http-status-codes";
import md5 from "md5";
import JWTUtil from "@utils/jwt.util";

export default class LoginCtrl {

    static async doLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserInfoModel.findAndCountAll({
                where: { user_email_id: req.body.email, password: md5(req.body.password) }
            });

            if (!data.count) {
                res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, msg: 'Invalid User!!!' });
                return;
            }

            const user = data.rows.map(usr => {
                const { password, ...rest } = usr.get();
                return rest;
            });

            const token = JWTUtil.generateToken({ id: user[0].user_id, email: user[0].user_email_id });

            console.log(token);
            res.sendRes(HttpStatus.OK, { success: true, token, data: user });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

}