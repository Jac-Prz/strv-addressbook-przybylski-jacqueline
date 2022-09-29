const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {

    // check we have email + password
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required.' });

    // check user exists
    const currentUser = await User.findOne({ email }).exec();
    if (!currentUser) return res.status(401).json({ 'message': 'Email is not in our system' });

    // check passwords match -> sent tokens to frontend and save refresh token to db
    const pwdsMatch = await bcrypt.compare(pwd, currentUser.password);
    if (pwdsMatch) {
        // make tokens
        const accessToken = jwt.sign({
            'email': currentUser.email
        },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { 'expiresIn': '60s' }
        );
        const refreshToken = jwt.sign({
            'email': currentUser.email
        },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { 'expiresIn': '1d' }
        );
        // save refresh token in db
        currentUser.refreshToken = refreshToken;
        const result = await currentUser.save();
        console.log(result);

        // send tokens to the frontend
        res.cookie('jwt', refreshToken, {'httpOnly': true, samesite: 'None', secure:true, maxAge: 24 * 60 * 60 * 1000});
        res.json({accessToken});

    } else {
        res.sendStatus(401); 
    }
}

module.exports = { handleLogin };