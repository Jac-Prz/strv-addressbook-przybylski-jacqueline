const User = require('../model/User');
const bcrypt = require('bcrypt');
const { createAccessToken, createRefreshToken } = require('../modules/tokens')

const handleLogin = async (req, res) => {

    // check we have email + password
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ message: 'Email and password are required.' });

    // check user exists
    const currentUser = await User.findOne({ email }).exec();
    if (!currentUser) return res.status(401).json({ message: 'Email is not in our system' });

    // check passwords match, make tokins
    const pwdsMatch = await bcrypt.compare(pwd, currentUser.password);
    if (!pwdsMatch) return res.sendStatus(401);
    const accessToken = createAccessToken(currentUser.email);
    const refreshToken = createRefreshToken(currentUser.email);
   
    // save refresh token in db
    currentUser.refreshToken = refreshToken;
    const result = await currentUser.save();
    
    // send tokens to the frontend
    res.cookie('jwt', refreshToken, { 'httpOnly': true, samesite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });

}

module.exports = { handleLogin };