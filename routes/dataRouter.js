const express = require('express');
const dataController = require('../controllers/dataController')
const authController = require("../controllers/authController");

const router = express.Router();

router.route('/')
    .post(authController.protect, dataController.createData)

router.route('/:id')
    .get(authController.protect, dataController.getDataById)
    .patch(authController.protect, dataController.updateData)
    .delete(authController.protect, dataController.deleteData)


module.exports =router;