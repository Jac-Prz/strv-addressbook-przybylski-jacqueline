const express = require('express');
const router = express.Router();
const { createNewAddress } = require('../../controllers/addressesController');
const methodNotAllowed = require('../../controllers/methodNotAllowed');

router.route('/')
.post(createNewAddress)
.all(methodNotAllowed);
// other routes send 405

module.exports = router;

