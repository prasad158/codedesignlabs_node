import express from "express";
import path from "path";
import dotenv from "dotenv";
import "module-alias/register";
import response_middleware from "@middlewares/response.middleware"
import main_router from "@routes/router";

const bodyParser = require('body-parser');

dotenv.config({ path: path.resolve('.env') });

const app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

app.use(response_middleware);

// for parsing multipart/form-data
app.use(express.static('public'));

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT ${process.env.PORT}`);
});

app.use('/api/gtw', main_router);
