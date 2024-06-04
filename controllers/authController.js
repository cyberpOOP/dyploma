const {promisify} = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: 31 * 3600 * 24});
}

const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const emailOptions = {
        from: 'Dyplom',
        to: options.email,
        subject: options.subject,
        text: options.message

    }

    await transporter.sendMail(emailOptions);
}

exports.signup = catchAsync( async(req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })

    const token = signToken(user._id);

    res.status(201).json({
        token
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

exports.forgotPassword = catchAsync( async(req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if (!user){
        return next(new AppError(`Such user doesn't exist`, 404));
    }

    const resetToken = user.createPasswordResetToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${resetToken}`;

    const message = `Click here to reset your Password: ${resetUrl}`;

    try{
        await sendEmail({
            email: user.email,
            subject: 'Password reset',
            message
        });

        res.status(200).json({
            resetToken
        });
    }
    catch (err){
        user.passwordResetToken = undefined
        user.passwordResetExpired = undefined

        user.save()

        return next(new AppError('Email error', 500));
    }

});

exports.resetPassword = catchAsync( async(req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpired:{$gt: Date.now()}});

    if (!user){
        return next(new AppError('Token is invalid or has expired', 401));
    }

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpired = undefined;

    await user.save();

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