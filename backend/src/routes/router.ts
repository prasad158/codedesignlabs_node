import express from "express";

import auth_routes from "@routes/auth.routes";
import dashboard_routes from "@routes/dashboard.routes";

const router = express.Router();

router.use('/auth', auth_routes);

router.use('/dashboard', dashboard_routes);

export default router;
