const {promisify} = require('util');
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 31 * 3600 * 24});
}

exports.signup = catchAsync( async(req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    const token = signToken(user._id);

    res.status(201).json({
        token,
        data:{
            user
        }
    })
})

exports.login = catchAsync( async(req, res, next) => {

    const {email, password} = req.body;

    if (!email || !password){
        return next(new AppError( 'Missing email or password' ,400));
    }

    const user = await User.findOne({email}).select('+password');

    if (!user || !(await user.checkPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(user._id);

    res.status(200).json({
        token
    })
})

exports.restrict = (...roles) =>{
    return (req, res, next) =>{
        if (!roles.includes(req.user.role)){
            return next(new AppError(`You don't have permission`, 403))
        }
        next()
    }
}

exports.protect = catchAsync( async(req, res, next) =>{

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return next(new AppError(`You're not logged`, 401))

    const decoded_token =  await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded_token.id)

    if (!user){
        return next(new AppError(`Such user doesn't exist`, 401));
    }

    if (user.changedPassword(decoded_token.iat)){
        return next(new AppError('Password was changed, log in again', 401))
    }

    req.user = user;
    next();
})