import express from "express";
import CommonCtrl from "@modules/common/common.ctrl";

const router = express.Router();

router.get('/permission/list', CommonCtrl.getPermissionList);
router.get('/freelancer_skills/list', CommonCtrl.getFreelancerSkills);

export default router;