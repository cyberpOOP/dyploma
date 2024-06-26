const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.route('/profile').post(authController.protect, userController.getUsersByIds)

router.route('/profile/:id')
    .get(authController.protect, userController.getUserById)
    .patch(authController.protect, userController.updateUser)
    .delete(authController.protect, userController.deleteUser)


module.exports =router;