import express from "express";
import LoginCtrl from "@modules/auth/login.ctrl";

const router = express.Router();

router.post('/login', LoginCtrl.doLogin);

export default router;