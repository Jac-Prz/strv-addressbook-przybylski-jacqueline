const User = require('../model/User');
const bcrypt = require('bcrypt');

const registerNewUser = async (req, res) => {

    // check that we have a username and password
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({'message': 'Username and password are required.'});
    
    // check that the username doesnt already exist
    const duplicate = await User.findOne({username: user}).exec();
    if (duplicate) return res.sendStatus(409);
    
    // hash the password and save credentials to db
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await User.create({
            'username': user, 
            'password': hashedPwd
        })
        res.status(201).json({"success": `New user ${user} added to database`})
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }

};

module.exports = { registerNewUser };