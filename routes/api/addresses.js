const express = require('express');
const router = express.Router();
const { getAllAddresses, getAddress, createNewAddress, updateAddress, deleteAddress } = require('../../controllers/addressesController');

router.route('/')
.get(getAllAddresses)
.post(createNewAddress)
.put(updateAddress)
.delete(deleteAddress);

router.route('/:id')
.get(getAddress);

module.exports = router;
