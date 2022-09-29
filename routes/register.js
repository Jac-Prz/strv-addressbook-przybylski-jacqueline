const express = require('express');
const router = express.Router();
const {registerNewUser} = require('../controllers/registerController');
const methodNotAllowed = require('../controllers/methodNotAllowed');

router.route('/') 
.post(registerNewUser)
.all(methodNotAllowed);


module.exports = router;