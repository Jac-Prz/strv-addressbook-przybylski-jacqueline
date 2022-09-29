const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
        console.log(result)
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }

    // make access and refresh tokens
    const accessToken = jwt.sign(
        { 'email': email },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { 'expiresIn': '30m' }
    );
    const refreshToken = jwt.sign(
        { 'email': email },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { 'expiresIn': '1d' }
    );

    // save refresh token in db
    const result = await User.findOneAndUpdate({ email }, { refreshToken });
    console.log(result);

    // send tokens to the frontend
    res.cookie('jwt', refreshToken, { 'httpOnly': true, samesite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(201).json({ accessToken });

};

module.exports = { registerNewUser };