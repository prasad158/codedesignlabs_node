import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import ClientModel from "@models/ClientModel";
import TaskModel from "@models/TaskModel";
import AssignmentTaskModel from "@models/AssignmentTaskModel";
import { Sequelize, Op } from "sequelize";
import moment from "moment";
import ProjectModel from "@models/ProjectModel";
import FreelancerModel from "@models/FreelancerModel";

export default class DashboardCtrl {

    static async getTileCount(req: Request, res: Response, next: NextFunction) {
        try {
            // get client count
            const { count: client_count } = await ClientModel.findAndCountAll();

            // get tasks count
            const task_total_count = await TaskModel.findOne({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("task_id")), "task_total_count"]],
            });

            // get task completed count
            const task_completed_count = await AssignmentTaskModel.findOne({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("task_id")), "task_completed_count"]],
                where: {
                    completed: 1,
                    completed_on: {
                        [Op.between]: [
                            moment().subtract(30, 'days').format('YYYY-MM-DD'),
                            moment().format('YYYY-MM-DD')
                        ]
                    }
                }
            });

            // get ongoing project count
            const total_project_count = await ProjectModel.findOne({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "total_project_count"]],
            });

            // get ongoing projects count
            const ongoing_projects_count = await ProjectModel.findOne({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "ongoing_projects_count"]],
                where: {
                    archive: 0
                }
            });

            // get freelancer count
            const freelancer_total_count = await FreelancerModel.findOne({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("freelancer_id")), "freelancer_total_count"]]
            });

            // get freelancer count
            const freelancer_active_count = await FreelancerModel.findOne({
                attributes: [[Sequelize.fn("COUNT", Sequelize.col("freelancer_id")), "freelancer_active_count"]],
                where: {
                    active: 1
                }
            });

            // get overdue payments
            const overdue_payments = await AssignmentTaskModel.findOne({
                attributes: [[Sequelize.fn("SUM", Sequelize.col("total")), "overdue_payments"]],
                where: {
                    completed: {
                        [Op.not]: 1
                    }
                }
            });

            // get completed payments
            const completed_payments = await AssignmentTaskModel.findOne({
                attributes: [[Sequelize.fn("SUM", Sequelize.col("total")), "completed_payments"]],
                where: {
                    completed: 1
                }
            });

            res.sendRes(HttpStatus.OK, {
                success: true,
                data: {
                    clients_served: { total: client_count },
                    task_count: {
                        total: (task_total_count as any)?.getDataValue('task_total_count'),
                        task_completed_count: (task_completed_count as any)?.getDataValue('task_completed_count')
                    },
                    projects_count: {
                        total: (total_project_count as any).getDataValue('total_project_count'),
                        ongoing_projects_count: (ongoing_projects_count as any).getDataValue('ongoing_projects_count')
                    },
                    freelancer_count: {
                        total: (freelancer_total_count as any).getDataValue('freelancer_total_count'),
                        freelancer_active_count: (freelancer_active_count as any).getDataValue('freelancer_active_count')
                    },
                    payments: {
                        overdue_payments: (overdue_payments as any).getDataValue('overdue_payments'),
                        completed_payments: (completed_payments as any).getDataValue('completed_payments')
                    }
                }
            });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

    static async getTodaysTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const todays_task = await TaskModel.findAll({
                attributes: [
                    "brief_title", "ClientModel.client_name", "ProjectModel.project_name", "FreelancerModel.freelancer_name"
                ],
                include: [
                    {
                        model: ClientModel,
                        where: {
                            id: Sequelize.col("TaskModel.client_id")
                        },
                        attributes: []
                    },
                    {
                        model: ProjectModel,
                        where: {
                            id: Sequelize.col("TaskModel.project_id")
                        },
                        attributes: []
                    },
                    {
                        model: FreelancerModel,
                        where: {
                            id: Sequelize.col("TaskModel.freelancer_id")
                        },
                        attributes: []
                    }
                ],
                where: {
                    deadline: moment().format("YYYY-MM-DD")
                },
                limit: 5,
                raw: true
            });

            res.sendRes(HttpStatus.OK, { success: true, data: todays_task });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

}
