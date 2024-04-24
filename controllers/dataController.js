const Data = require('../models/dataModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");
const {login} = require("./authController");

exports.getDataById = catchAsync( async(req, res, next) => {

    const data = await Data.findById(req.params.id)

    if(!data){
        return next(new AppError(`Data with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            data
        }
    })
})

exports.createData = catchAsync( async(req, res, next) => {

    const data = await Data.create(req.body)

    res.status(200).json({
        data:{
            data
        }
    })
})

exports.updateData = catchAsync( async(req, res, next) => {

    const data = await Data.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})


    if(!data){
        return next(new AppError(`Data with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            data
        }
    })
})

exports.deleteData = catchAsync( async(req, res, next)=> {
    const data = await Data.findByIdAndDelete(req.params.id)

    if(!data){
        return next(new AppError(`Data with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200)
})