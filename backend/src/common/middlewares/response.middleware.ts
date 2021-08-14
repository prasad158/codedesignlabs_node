import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.sendRes = (status: number, body) => {
        res.status(status).send(body);
    }

    next();
}