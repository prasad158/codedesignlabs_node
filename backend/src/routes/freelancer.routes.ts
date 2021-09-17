import express from "express";
import { verifyToken, getUserFromToken } from "@middlewares/jwt.middleware";
import FreelancersCtrl from "@modules/freelancers/freelancers.ctrl";
import multer from "multer";

const router = express.Router();

router.get("/list", verifyToken, getUserFromToken, FreelancersCtrl.getFreelancerList);
router.get("/:freelancer_id", verifyToken, getUserFromToken, FreelancersCtrl.getFreelancer);

router.post("/add", verifyToken, getUserFromToken, multer().none(), FreelancersCtrl.addNewFreelancer);
router.put("/:freelancer_id/update", verifyToken, getUserFromToken, multer().none(), FreelancersCtrl.updateFreelancer);
router.patch("/:freelancer_id/:status", verifyToken, getUserFromToken, FreelancersCtrl.setFreelancerStatus);

export default router;
