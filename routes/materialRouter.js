const express = require('express');
const materialController = require('../controllers/materialController')
const authController = require("../controllers/authController");

const router = express.Router();

router.route('/')
    .post(authController.protect, materialController.createMaterial)

router.route('/:id')
    .get(authController.protect, materialController.getMaterialById)
    .patch(authController.protect, materialController.updateMaterial)
    .delete(authController.protect, materialController.deleteMaterial)


module.exports =router;