import express from "express";
import DashboardCtrl from "@modules/dashboard/dashboard.ctrl";
import { verifyToken, getUserFromToken } from "@middlewares/jwt.middleware";

const router = express.Router();

router.get("/tile_count", verifyToken, getUserFromToken, DashboardCtrl.getTileCount);
router.get("/today_tasks", verifyToken, getUserFromToken, DashboardCtrl.getTodaysTasks);

export default router;