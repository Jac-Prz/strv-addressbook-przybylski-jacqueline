const User = require('../model/User');
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('../modules/tokens')

const registerNewUser = async (req, res) => {

    // check we have email + password
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ message: 'Email and password are required.' });

    // check the email doesnt already exist
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate) return res.status(409).json({ message: 'Email is already registered' });

    // hash the password and save credentials to db
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await User.create({
            'email': email,
            'password': hashedPwd
        })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }

    // make tokens
    const accessToken = createAccessToken(email);
    const refreshToken = createRefreshToken(email);

    // save refresh token in db
    const result = await User.findOneAndUpdate({ email }, { refreshToken });

    // send tokens to the frontend
    res.cookie('jwt', refreshToken, { 'httpOnly': true, samesite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken });

};

module.exports = { registerNewUser };