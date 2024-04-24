const Material = require('../models/materialModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");

exports.getMaterialById = catchAsync( async(req, res, next) => {
    const material = await Material.findById(req.params.id)

    if(!material){
        return next(new AppError(`Material with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            material
        }
    })
})

exports.createMaterial = catchAsync( async(req, res, next) => {
    const material = await Material.create(req.body)

    res.status(200).json({
        data:{
            material
        }
    })
})

exports.updateMaterial = catchAsync( async(req, res, next) => {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

    if(!material){
        return next(new AppError(`Material with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            material
        }
    })
})

exports.deleteMaterial = catchAsync( async(req, res, next)=> {
    const material = await Material.findByIdAndDelete(req.params.id)

    if(!material){
        return next(new AppError(`Material with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            material
        }
    })
})