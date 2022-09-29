const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const createNewAddress = async (req, res) => {

    // check we have all data
    if (!req.body.firstName || !req.body.lastName || !req.body.phone || !req.body.address) return res.status(400).json({ "message": "All fields are required" });

    // add data to the address book under the email in the jwt
    try {
        const docRef = db.collection(req.userEmail).doc(`${req.body.lastName}-${req.body.firstName}`)
        const response = await docRef.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            address: req.body.address
        });
        res.status(201).json({
            "success": `${req.body.lastName}-${req.body.firstName} was added to address book`,
            "response": response
        });
    } catch (error) {
        res.status(400).json({ error });
    };
};

module.exports = { createNewAddress }
