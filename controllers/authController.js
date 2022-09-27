const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {

    // check that we have a username and password
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    // check that user exists
    const currentUser = await User.findOne({ username: user }).exec();
    if (!currentUser) return res.status(401).json({ "message": "User doesnt exist" });

    // check that passwords match, if so -> sent tokens to frontend and save refresh token to db
    const pwdsMatch = await bcrypt.compare(pwd, currentUser.password);
    if (pwdsMatch) {
        // make tokens
        const accessToken = jwt.sign({
            'UserInfo': {
                'username': currentUser.username,
                'id': currentUser._id
             }
        },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { 'expiresIn': '60s' }
        );
        const refreshToken = jwt.sign({
            'username': currentUser.username
        },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            { 'expiresIn': '1d' }
        );
        // save refresh token in db
        currentUser.refreshToken = refreshToken;
        const result = await currentUser.save();
        console.log(result);

        // send tokens to the frontend
        res.cookie('jwt', refreshToken, {'httpOnly': true, samesite: 'None', maxAge: 24 * 60 * 60 * 1000}); // In production - secure:true
        res.json({accessToken});

    } else {
        res.sendStatus(401); 
    }
}

module.exports = { handleLogin };