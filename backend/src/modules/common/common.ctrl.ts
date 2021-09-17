import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import UserPermisssionModel from "@models/UserPermissionModel";
import FreelancerSkillsModel from "@models/FreelancerSkillsModel";

export default class CommonCtrl {

    static async getPermissionList(req: Request, res: Response, next: NextFunction) {
        try {
            const permissions = await UserPermisssionModel.findOne({
                attributes: {
                    exclude: ['permission_id', 'user_id', 'created_by', 'created_at', 'updated_by', 'updated_ar']
                },
                raw: true,
                nest: true
            });

            const permission_list = Object.keys(permissions as any);

            res.sendRes(HttpStatus.OK, { success: true, data: { permission_list } });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async getFreelancerSkills(req: Request, res: Response, next: NextFunction) {
        try {
            const work_preference = await FreelancerSkillsModel.findAll({
                raw: true
            });

            res.sendRes(HttpStatus.OK, { success: true, data: { work_preference } });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

}
