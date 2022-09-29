const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require('../controllers/refreshTokenController');
const methodNotAllowed = require('../controllers/methodNotAllowed');

router.route('/')
.get(handleRefreshToken)
.all(methodNotAllowed);

module.exports = router;