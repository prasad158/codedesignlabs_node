import express from "express";
import DashboardCtrl from "@modules/dashboard/dashboard.ctrl";
import { verifyToken } from "@middlewares/jwt.middleware";

const router = express.Router();

router.get("/tile_count", verifyToken, DashboardCtrl.getTileCount);

export default router;