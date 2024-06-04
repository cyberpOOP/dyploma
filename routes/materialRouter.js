const express = require('express');
const materialController = require('../controllers/materialController')
const authController = require("../controllers/authController");

const router = express.Router();

router.route('/')
    .post(authController.protect, authController.restrict('author'), materialController.createMaterial)

router.route('/:id')
    .get(authController.protect, materialController.getMaterialById)
    .patch(authController.protect, authController.restrict('author', 'admin'), materialController.updateMaterial)
    .delete(authController.protect, authController.restrict('author', 'admin'), materialController.deleteMaterial)


module.exports =router;