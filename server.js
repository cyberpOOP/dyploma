const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

const app = require("./app");

const DB = process.env.DB_STRING.replace('<password>', process.env.DB_PASS);

mongoose.connect(DB)
    .catch(err=> console.log(err))
    .then(()=>{
        console.log('DB connected');
        app.listen(process.env.PORT, () => {
            console.log(`express on http://localhost:${process.env.PORT}`);
        });
    });


