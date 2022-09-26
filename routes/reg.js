const express = require('express');
const router = express.Router();
const {registerNewUser} = require('../controllers/regController');

router.post('/', registerNewUser)

module.exports = router;