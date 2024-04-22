const express = require("express");
const morgan = require("morgan");

const courseRouter = require('routes/courseRouter');
const dataRouter = require('routes/dataRouter');
const materialRouter = require('routes/materialRouter');
const userRouter = require('routes/userRouter');

const app = express();

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json());

app.use('/api/course', courseRouter);
app.use('/api/data', dataRouter);
app.use('/api/material', materialRouter);
app.use('/api/user', userRouter);

app.all('*', (req, res)=>{
res.status(404).json({
        status: 'failed',
        message: `can't find ${req.originalUrl}`
    });
});


module.exports = app;