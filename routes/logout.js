const express = require('express');
const router = express.Router();
const { handleLogout } = require('../controllers/logoutController');
const methodNotAllowed = require('../controllers/methodNotAllowed');

router.route('/')
.get(handleLogout)
.all(methodNotAllowed);

module.exports = router;