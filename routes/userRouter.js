const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router();

router.route('/signup')
    .post(authController.signup)
router.route('/login')
    .post(authController.login)

router.route('/profile/:id')
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports =router;