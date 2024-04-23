const Course = require('../models/courseModel')
const catchAsync = require('../utils/catchAsync')


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

    res.status(200).json({
        data: {
            course
        }
    })
})

exports.createCourse = catchAsync((req, res, next) => {

    const course =  Course.create(req.body)

    res.status(201).json({
        data:{
            course
        }
    })
})

exports.updateCourse = catchAsync( async(req, res, next) => {

    const newCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({
        data:{
            newCourse
        }
    })
})

exports.deleteCourse = catchAsync( async(req, res, next)=> {

    await Course.findByIdAndDelete(req.params.id)

    res.status(200)
})