// These are the basic CRUD operations we will need. Currently working with sample data from a json. Will integrate with Firebase instead

const data = {
    addresses: require('../model/addresses.json'),
    setAddresses: function (data) { this.addresses = data }
}

const getAllAddresses = (req, res) => {
    res.json(data.addresses);
}

const getAddress = async (req, res) => {
    const address = await data.addresses.find(ad => ad.id == req.params.id)
    if (!address) {
        res.status(400).json({ err: `id: ${req.params.id} doesnt exist` })
    } else {
        res.json(address)
    }
}

const createNewAddress = (req, res) => {
    const newAddress = {
        "id": data.addresses[data.addresses.length - 1].id + 1 || 1,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "phone": req.body.phone,
        "address": req.body.address
    }

    if (!req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.address) {
        return res.status(400).json({ err: "All fields are required" });
    } else {
        data.setAddresses([...data.addresses, newAddress]);
        res.status(201).json({ success: `${req.body.firstName} ${req.body.lastName} was added to address book` });
    }
}

const updateAddress = (req, res) => {
    const address = data.addresses.find(ad => ad.id == req.body.id);
    if (!address) {
        res.status(400).json({ err: `id: ${req.body.id} doesnt exist` });
    } else{
        if (req.body.firstName) address.firstName = req.body.firstName;
        if (req.body.lastName) address.lastName = req.body.lastName;
        if (req.body.phone) address.phone = req.body.phone;
        if (req.body.address) address.address = req.body.address;
        const newData = data.addresses.filter(ad => ad.id !== req.body.id);
        data.setAddresses([...newData, address]);
        console.log(data.addresses);
        res.json({ success: `id: ${req.body.id} has been updated` })
    }   
}

const deleteAddress = (req, res) => {
    const address = data.addresses.find(ad => ad.id == req.body.id)
    if (!address) {
        res.status(400).json({ err: `id: ${req.body.id} doesnt exist` });
    } else {
        const newData = data.addresses.filter(ad => ad.id !== req.body.id)
        data.setAddresses([...newData]);
        res.json({ success: `id: ${req.body.id} has been deleted` })
    }
}

module.exports = { getAllAddresses, getAddress, createNewAddress, updateAddress, deleteAddress }