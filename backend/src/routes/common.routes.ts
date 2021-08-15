import express from "express";
import CommonCtrl from "@modules/common/common.ctrl";

const router = express.Router();

router.get('/list', CommonCtrl.getPermissionList);

export default router;