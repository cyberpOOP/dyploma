const Data = require('../models/dataModel')
const catchAsync = require('../utils/catchAsync')

exports.getDataById = catchAsync( async(req, res, next) => {

    const data = await Data.findById(req.params.id)

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
    const data = await Data.findByIdAndUpdate(req.params.id)

    res.status(200).json({
        data:{
            data
        }
    })
})

exports.deleteData = catchAsync( async(req, res, next)=> {
    const data = await Data.findByIdAndDelete(req.params.id)

    res.status(200)
})