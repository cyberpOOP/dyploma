const express = require('express');
const materialController = require('../controllers/materialController')

const router = express.Router();

router.route('/')
    .post(materialController.createMaterial)

router.route('/:id')
    .get(materialController.getMaterialById)
    .patch(materialController.updateMaterial)
    .delete(materialController.deleteMaterial)


module.exports =router;