const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

exports.getUserById = catchAsync( async(req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new AppError(`User with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            user
        }
    })
})

exports.getUsersByIds = catchAsync( async(req, res, next) => {

    const ids = [...req.body];
    let users = [];
    let usersNames = [];

    for(let id of ids){
        users.push(await User.findById(id));
    }

    for(let user of users){
        usersNames.push(user.name)
    }

    res.status(200).json({
        data:{
            usersNames
        }
    })
});

exports.updateUser = catchAsync( async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if(!user){
        return next(new AppError(`User with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            user
        }
    })
})

exports.deleteUser = catchAsync( async(req, res, next)=> {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
        return next(new AppError(`User with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{

        }
    })
})