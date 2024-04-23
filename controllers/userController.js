const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')

exports.getUserById = catchAsync( async(req, res, next) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({
        data:{
            user
        }
    })
})

exports.updateUser = catchAsync( async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id)

    res.status(200).json({
        data:{
            user
        }
    })
})

exports.deleteUser = catchAsync( async(req, res, next)=> {
    const user = await User.findByIdAndDelete(req.params.id)

    res.status(200)
})