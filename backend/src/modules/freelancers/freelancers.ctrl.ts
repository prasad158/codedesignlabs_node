import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { Op, Sequelize, WhereOptions } from "sequelize";
import FreelancerModel from "@models/FreelancerModel";
import FreelancerProfileTypeModel from "@models/FreelancerProfileTypeModel";
import { validateObject } from "@utils/common.util";
import moment from "moment";

export default class FreelancersCtrl {

    static async getFreelancerList(req: Request, res: Response, next: NextFunction) {
        try {
            const active = req.query.status;
            const profile_type = req.query.profile_type;
            const limit = req.query.limit;
            const offset = req.query.offset;
            const sort_by = req.query.sort_by;
            const order_by = req.query.order_by;

            const where: WhereOptions = {};
            if (active) { where.active = (active === 'active') ? true : false; }
            if (profile_type && profile_type != 'all') { where.profile_type = profile_type; }

            const freelancers = await FreelancerModel.findAll({
                attributes: ["FreelancerModel.*", "FreelancerProfileTypeModel.freelancer_profile_type_name"],
                where,
                include: [{
                    model: FreelancerProfileTypeModel,
                    attributes: []
                }],
                limit: limit ? parseInt(limit.toString(), 10) : undefined,
                offset: offset ? parseInt(offset.toString(), 10) : undefined,
                order: (sort_by && order_by) ? [[sort_by.toString(), order_by.toString()]] : [[Sequelize.col('id'), 'desc']],
                raw: true
            });

            res.sendRes(HttpStatus.OK, { success: true, data: freelancers });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async getFreelancer(req: Request, res: Response, next: NextFunction) {
        try {
            const freelancer_id = req.params.freelancer_id;

            const freelancer_data = await FreelancerModel.findOne({
                attributes: ["FreelancerModel.*", [Sequelize.col("FreelancerProfileTypeModel.freelancer_profile_type_name"), "profile_type_name"]],
                include: [
                    {
                        model: FreelancerProfileTypeModel,
                        where: {
                            freelancer_profile_type_id: Sequelize.col('FreelancerModel.profile_type')
                        },
                        attributes: []
                    }
                ],
                where: {
                    freelancer_id
                },
                raw: true
            })

            res.sendRes(HttpStatus.OK, { success: true, data: freelancer_data });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async addNewFreelancer(req: Request, res: Response, next: NextFunction) {
        try {
            const freelancer_data = req.body.freelancer as FreelancerModel;

            // validate all fields exists in req
            if (!validateObject(["freelancer_name", "freelancer_email_id", "profile_type", "portfolio_link", "date_of_joining", "freelancer_address", "freelancer_mobile_number", "work_preference", "usp_as_discovered", "dob", "account_number", "bank_name", "ifsc_code", "Ac_Type", "pan_card"], freelancer_data)) {
                res.sendRes(HttpStatus.BAD_REQUEST, { success: false, msg: 'Not able to create Freelancer, some values are missing!!' });
                return;
            }

            freelancer_data.active = true;
            freelancer_data.created_by = req.user.id;

            // add user data
            const created_freelancer = await FreelancerModel.create(freelancer_data);

            res.sendRes(HttpStatus.OK, { success: true, msg: "Freelancer Created Successfully!!", data: { freelancer: created_freelancer } });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async updateFreelancer(req: Request, res: Response, next: NextFunction) {
        try {
            const freelancer_id = req.params.freelancer_id;
            const freelancer_data = req.body.freelancer;

            // validate all fields exists in req
            if (!validateObject(["freelancer_name", "freelancer_email_id", "profile_type", "portfolio_link", "date_of_joining", "freelancer_address", "freelancer_mobile_number", "work_preference", "usp_as_discovered", "dob", "account_number", "bank_name", "ifsc_code", "Ac_Type", "pan_card"], freelancer_data)) {
                res.sendRes(HttpStatus.BAD_REQUEST, { success: false, msg: 'Not able to create User, some values are missing!!' });
                return;
            }

            // check email already exists
            const exists_user = await FreelancerModel.findAll({ where: { freelancer_id: { [Op.not]: freelancer_id }, freelancer_email_id: freelancer_data.freelancer_email_id }, raw: true });
            if (Object.keys(exists_user).length) {
                res.sendRes(HttpStatus.BAD_REQUEST, { success: false, msg: 'Email-ID already exists!!!' });
                return;
            }

            freelancer_data.updated_at = moment().format('YYYY-MM-DD');
            freelancer_data.updated_by = req.user.id;

            // // add user data
            const updated_freelancer = await FreelancerModel.update(
                freelancer_data,
                { where: { freelancer_id } }
            );

            res.sendRes(HttpStatus.OK, { success: true, msg: "Freelancer Updated Successfully!!" });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async setFreelancerStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const freelancer_id = req.params.freelancer_id;
            const status = req.params.status;

            FreelancerModel.update(
                { active: (status === 'active') ? true : false },
                { where: { freelancer_id } }
            );

            res.sendRes(HttpStatus.OK, { success: true, msg: `Freelancer ${(status === 'active') ? "Activated" : "Deactivated"}!!` });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

}