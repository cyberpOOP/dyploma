const express = require('express');

const router = express.Router();

router.route('/signup')
    .post()
router.route('/login')
    .post()

router.route('/profile/:id')
    .get()
    .patch()
    .delete()


module.exports =router;