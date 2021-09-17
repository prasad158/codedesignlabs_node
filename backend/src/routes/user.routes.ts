import express from "express";
import multer from "multer";
import UserCtrl from "@modules/user/users.ctrl";
import { verifyToken, getUserFromToken } from "@middlewares/jwt.middleware";
import { checkUserPermissions } from "@middlewares/common.middleware";

const router = express.Router();

router.get("/list/:type?", verifyToken, getUserFromToken, UserCtrl.getUserList);
router.get("/:user_id/permissions", verifyToken, getUserFromToken, UserCtrl.getUserPermissions);
router.get("/:user_id", verifyToken, getUserFromToken, UserCtrl.getUser);

router.post("/add", verifyToken, getUserFromToken, checkUserPermissions('add_new_user'), multer({ dest: 'uploads/user_dp/' }).single('file_to_upload'), UserCtrl.addNewUser);
router.put("/:user_id/update", verifyToken, getUserFromToken, checkUserPermissions('edit_new_user'), multer({ dest: 'uploads/user_dp/' }).single('file_to_upload'), UserCtrl.updateUser);
router.patch("/:user_id/:status", verifyToken, getUserFromToken, checkUserPermissions('deactivate_user'), UserCtrl.setUserStatus);

export default router;
