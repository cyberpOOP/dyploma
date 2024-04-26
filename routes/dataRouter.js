const express = require('express');
const dataController = require('../controllers/dataController')
const authController = require("../controllers/authController");

const router = express.Router();

router.route('/')
    .post(authController.protect, dataController.createData)

router.route('/:id')
    .get(authController.protect, dataController.getDataById)
    .patch(authController.protect, authController.restrict('admin'), dataController.updateData)
    .delete(authController.protect, authController.restrict('admin'), dataController.deleteData)


module.exports =router;