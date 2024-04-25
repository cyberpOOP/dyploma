const express = require('express');
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

const router = express.Router();

router.post('/signup', authController.signup)


router.post('/login', authController.login)

router.route('/profile/:id')
    .get(userController.getUserById)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports =router;