const express = require('express');
const router = express.Router();
const { createNewAddress } = require('../../controllers/addressesController');

router.route('/').post(createNewAddress);
// other routes send 405

module.exports = router;
