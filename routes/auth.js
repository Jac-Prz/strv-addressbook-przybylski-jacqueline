const express = require('express');
const router = express.Router();
const { handleLogin } = require('../controllers/authController');
const methodNotAllowed = require('../controllers/methodNotAllowed');

router.route('/')
.post(handleLogin)
.all(methodNotAllowed);


module.exports = router;