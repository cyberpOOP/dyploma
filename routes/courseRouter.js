const express = require('express');
const courseController = require('../controllers/courseController')
const authController = require('./../controllers/authController')

const router = express.Router();

router.route('/')
    .get(authController.protect, courseController.getAllCourses)
    .post(authController.protect, authController.restrict('author'), courseController.createCourse)

router.route('/:id')
    .get(authController.protect, courseController.getCourseById)
    .patch(authController.protect, authController.restrict('author', 'admin'), courseController.updateCourse)
    .delete(authController.protect, authController.restrict('author', 'admin'), courseController.deleteCourse)


module.exports =router;