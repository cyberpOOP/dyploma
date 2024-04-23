const Material = require('../models/materialModel')
const catchAsync = require('../utils/catchAsync')

exports.getMaterialById = catchAsync( async(req, res, next) => {
    const material = await Material.findById(req.params.id)

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
    const material = await Material.findByIdAndUpdate(req.params.id)

    res.status(200).json({
        data:{
            material
        }
    })
})

exports.deleteMaterial = catchAsync( async(req, res, next)=> {
    const material = await Material.findByIdAndDelete(req.params.id)

    res.status(200).json({
        data:{
            material
        }
    })
})