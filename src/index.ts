import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { index_route } from './index_routing';
import { connectDB } from './config/dbConnection';
import commonHelper from './helper/commonHelper';
dotenv.config();

/* DEFINING GLOBAL VARIABLES */
global.CONFIG = require("./config/env/" + process.env.NODE_ENV);
global.HELPER = new commonHelper();
/* ------------------------- */

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
    res.send('Hello from server!')
});

app.use('/v1', index_route)

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));