import UserInfoModel, { IUserInfoModel } from "@models/UserInfoModel";
import UserPermisssionModel from "@models/UserPermissionModel";
import { validateObject } from "@utils/common.util";
import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import md5 from "md5";
import fs from "fs";
import { Op, Sequelize } from "sequelize";
import moment from "moment";

export default class UserCtrl {

    static async getUserList(req: Request, res: Response, next: NextFunction) {
        try {
            const user_status_type = req.query.status;
            const limit = req.query.limit;
            const offset = req.query.offset;
            const sort_by = req.query.sort_by;
            const order_by = req.query.order_by;

            const user = await UserInfoModel.findAll({
                where: user_status_type ? { active: parseInt(UserInfoModel.getUserStatus(user_status_type.toString()).toString(), 10) } : {},
                limit: limit ? parseInt(limit.toString(), 10) : undefined,
                offset: offset ? parseInt(offset.toString(), 10) : undefined,
                order: (sort_by && order_by) ? [[sort_by.toString(), order_by.toString()]] : [[Sequelize.col('user_id'), 'desc']],
                raw: true
            });

            let user_data = user.map(({ password, ...rest }) => rest);

            res.sendRes(HttpStatus.OK, { success: true, data: user_data });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params.user_id;

            const user = await UserInfoModel.findAll({
                where: {
                    user_id
                },
                raw: true
            });

            // let user_data = user.map(({ password, ...rest }) => rest);

            res.sendRes(HttpStatus.OK, { success: true, data: user });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async getUserPermissions(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params.user_id;

            const user_permissions = await UserPermisssionModel.findAll({
                where: { user_id },
                raw: true
            });

            res.sendRes(HttpStatus.OK, { success: true, data: user_permissions });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async addNewUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user_data = req.body.user as UserInfoModel;
            const permissions = req.body.permissions;

            // validate all fields exists in req
            if (!validateObject(["user_email_id", "password", "user_name", "mobile", "designation", "dp", "department"], user_data)) {
                res.sendRes(HttpStatus.BAD_REQUEST, { success: false, msg: 'Not able to create User, some values are missing!!' });
                return;
            }

            // check email already exists
            const exists_user = await UserInfoModel.findAll({ where: { user_email_id: user_data.user_email_id }, raw: true });
            if (Object.keys(exists_user).length) {
                res.sendRes(HttpStatus.BAD_REQUEST, { success: false, msg: 'Email-ID already exists!!!' });
                return;
            }

            // rename uploaded file
            if (req.file) {
                const file_names = req.file?.originalname.toString().split(".");
                const new_file_name = user_data.user_email_id + "." + (file_names as string[])[(file_names as string[])?.length - 1];
                fs.renameSync(req.file?.destination + "" + req.file?.filename, req.file?.destination + "" + new_file_name);
                user_data.dp = new_file_name
            }


            user_data.password = md5(user_data.password);
            user_data.created_by = req.user.id;

            // add user data
            const created_user = await UserInfoModel.create(user_data);
            const created_user_info: IUserInfoModel = created_user.toJSON() as IUserInfoModel;

            // add user permissions
            permissions.user_id = created_user_info.user_id;
            permissions.created_by = req.user.id;
            const created_permissions = await UserPermisssionModel.create(permissions);

            res.sendRes(HttpStatus.OK, { success: true, msg: "User Created Successfully!!", data: { user: created_user_info, permissions: created_permissions.toJSON() } });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params.user_id;
            const user_data = req.body.user;
            const permissions = req.body.permissions;

            // validate all fields exists in req
            if (!validateObject(["user_email_id", "password", "user_name", "mobile", "designation", "dp", "department"], user_data)) {
                res.sendRes(HttpStatus.BAD_REQUEST, { success: false, msg: 'Not able to create User, some values are missing!!' });
                return;
            }

            // check email already exists
            const exists_user = await UserInfoModel.findAll({ where: { user_id: { [Op.not]: user_id }, user_email_id: user_data.user_email_id }, raw: true });
            if (Object.keys(exists_user).length) {
                res.sendRes(HttpStatus.BAD_REQUEST, { success: false, msg: 'Email-ID already exists!!!' });
                return;
            }

            // rename uploaded file
            if (req.file) {
                const file_names = req.file?.originalname.toString().split(".");
                const new_file_name = user_data.user_email_id + "." + (file_names as string[])[(file_names as string[])?.length - 1];
                fs.renameSync(req.file?.destination + "" + req.file?.filename, req.file?.destination + "" + new_file_name);
                user_data.dp = new_file_name
            }


            user_data.password = md5(user_data.password);
            user_data.updated_at = moment().format('YYYY-MM-DD');
            user_data.updated_by = req.user.id;

            // // add user data
            const updated_user = await UserInfoModel.update(
                user_data,
                { where: { user_id } }
            );

            // add user permissions
            permissions.updated_at = moment().format('YYYY-MM-DD');
            permissions.updated_by = req.user.id;
            await UserPermisssionModel.update(
                permissions,
                { where: { user_id } }
            );

            res.sendRes(HttpStatus.OK, { success: true, msg: "User Updated Successfully!!" });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async setUserStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params.user_id;
            const status = req.params.status;

            UserInfoModel.update(
                { active: (status === 'active') ? true : false },
                { where: { user_id } }
            );

            res.sendRes(HttpStatus.OK, { success: true, msg: `User ${(status === 'active') ? "Activated" : "Deactivated"}!!` });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

}
