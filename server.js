const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

const app = require("./app");


app.listen(process.env.PORT, () => {
    console.log(`express on http://localhost:${process.env.PORT}`);
});