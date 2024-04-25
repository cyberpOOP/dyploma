const Course = require('../models/courseModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllCourses = catchAsync( async (req, res, next) => {

    const courses = await Course.find();

    res.status(200).json({
        data: {
            courses
        }
    })
})

exports.getCourseById = catchAsync( async(req, res, next) => {

    const course = await Course.findById(req.params.id)

    if(!course){
        return next(new AppError(`Course with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data: {
            course
        }
    })
})

exports.createCourse = catchAsync( async(req, res, next) => {

    const course = await Course.create(req.body)

    res.status(201).json({
        data:{
            course
        }
    })
})

exports.updateCourse = catchAsync( async(req, res, next) => {

    const newCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    if(!newCourse){
        return next(new AppError(`Course with ${req.params.id} doesn't exist`, 404))
    }

    res.status(200).json({
        data:{
            newCourse
        }
    })
})

exports.deleteCourse = catchAsync( async(req, res, next)=> {

    const course = await Course.findByIdAndDelete(req.params.id)

    if(!course){
        return next(new AppError(`Course with ${req.params.id} doesn't exist`, 404))
    }
    res.status(200).json({
        data:{

        }
    })

})