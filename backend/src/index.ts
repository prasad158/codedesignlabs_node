import express from "express";
import path from "path";
import dotenv from "dotenv";
import "module-alias/register";
import response_middleware from "@middlewares/response.middleware"
import main_router from "@routes/router";

const bodyParser = require('body-parser');

dotenv.config({ path: path.resolve('.env') });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(response_middleware);

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
});

app.use('/api/gtw', main_router);
