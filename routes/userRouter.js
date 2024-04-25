const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup)


router.post('/login', authController.login)

router.route('/profile/:id')
    .get(authController.protect, userController.getUserById)
    .patch(authController.protect, userController.updateUser)
    .delete(authController.protect, userController.deleteUser)


module.exports =router;