const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

process.on('uncaughtException', err =>{
    console.log(err.name, err.message);
    server.close(()=>{
        process.exit(1);
    });
});

process.on('unhandledRejection', err =>{
    console.log(err.name, err.message);
    server.close(()=>{
        process.exit(1);
    });
});

const app = require("./app");

const DB = process.env.DB_STRING.replace('<password>', process.env.DB_PASS);

const server = app.listen(process.env.PORT, () => {
    console.log(`express on http://localhost:${process.env.PORT}`);
});

mongoose.connect(DB)
    .then(()=>{
        console.log('DB connected');
    })
    .catch(err=> {
        console.log(err.errmsg);
        server.close(()=>{
            process.exit(1);
        });
    });