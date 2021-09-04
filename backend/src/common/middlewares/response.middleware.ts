import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.sendRes = (status: number, body) => {
        console.log(req);
        console.log(res);
        res.status(status).send(body);
    }

    next();
}