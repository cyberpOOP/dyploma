const express = require("express");
const morgan = require("morgan");
const AppError = require('./utils/appError')
const errorMiddleware = require('./controllers/errorController')

const courseRouter = require('./routes/courseRouter');
const dataRouter = require('./routes/dataRouter');
const materialRouter = require('./routes/materialRouter');
const userRouter = require('./routes/userRouter');
const {credentials} = require("./middleware/credentials");

const app = express();

app.use(credentials);

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json());


app.use('/api/course', courseRouter);
app.use('/api/data', dataRouter);
app.use('/api/material', materialRouter);
app.use('/api/user', userRouter);

app.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorMiddleware);

module.exports = app;