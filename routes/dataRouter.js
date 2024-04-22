const express = require('express');
const dataController = require('../controllers/dataController')

const router = express.Router();

router.route('/')
    .post(dataController.createData)

router.route('/:id')
    .get(dataController.getDataById)
    .patch(dataController.updateData)
    .delete(dataController.deleteData)


module.exports =router;