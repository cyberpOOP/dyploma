const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

exports.signup = catchAsync( async(req, res, next) => {
    const user = await User.create(req.body)

    res.status(200).json({
        data:{
            user
        }
    })
})

exports.login = catchAsync( async(req, res, next) => {
    res.status(200).json({
        message: 'log User'
    })
})

exports.restrict = catchAsync( async(req, res, next)=> {

})

exports.protect = catchAsync( async(req, res, next) =>{

})