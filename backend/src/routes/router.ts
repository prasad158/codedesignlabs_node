import express from "express";

import auth_routes from "@routes/auth.routes";
import dashboard_routes from "@routes/dashboard.routes";
import user_routes from "@routes/user.routes";
import common_routes from "@routes/common.routes";

const router = express.Router();

router.use('/auth', auth_routes);

router.use('/dashboard', dashboard_routes);

router.use('/user', user_routes);

router.use('/common/permission', common_routes);

export default router;
