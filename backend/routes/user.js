const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);    // Récupère le controller signup dans   '/backend/controllers/user' //
router.post('/login', userCtrl.login);      // Récupère le controller login dans    '/backend/controllers/user' //


module.exports = router;