import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";

export default class DashboardCtrl {

    static async getTileCount(req: Request, res: Response, next: NextFunction) {
        try {
            res.sendRes(HttpStatus.OK, { success: true, data: { clients_served: 10 } });
        } catch (err) {
            res.sendRes(HttpStatus.INTERNAL_SERVER_ERROR, { success: false, stack: err });
        }
    }

}
