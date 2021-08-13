import express from "express";
import path from "path";
import dotenv from "dotenv";
import "module-alias/register"

import router from "@routes/router";

dotenv.config({ path: path.resolve('.env') });

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
});

app.use('/api/gtw', router)