const { getDatabase, ref, set, onValue, remove, update } = require('firebase/database');
const db = getDatabase();

const getAllAddresses = (req, res) => {
     const reference = ref(db, `${req.id}`);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    })
}

const getAddress = async (req, res) => {
    
    const reference = ref(db, `${req.id}/${req.params.id}`);
    onValue(reference, (snapshot) => {
        const data = snapshot.val();
        res.json(data);
    })
}

const createNewAddress = (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.address) return res.status(400).json({ "message": "All fields are required" });
    
    const reference = ref(db, `${req.id}/${req.body.lastName}-${req.body.firstName}`);
    set(reference, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address
    });
    res.status(201).json({ success: `${req.body.lastName}-${req.body.firstName} was added to address book` });
}

const updateAddress = (req, res) => {

    //this will delete all other data
    const updates = {};
    const updateData = req.body.update;
    updates[`${req.id}/${req.body.name}`] = updateData;
    update(ref(db), updates);
    res.json({'message': `${req.body.name} updated`})

}

const deleteAddress = (req, res) => {
    //should check if db exists first
     remove(ref(db, `${req.id}/${req.body.name}`));
    res.json({ 'message': `${req.body.name} deleted` });
}

module.exports = { getAllAddresses, getAddress, createNewAddress, updateAddress, deleteAddress }
