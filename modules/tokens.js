const jwt = require('jsonwebtoken');

const createAccessToken = (email) => {
    return jwt.sign({
        'email': email
    },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { 'expiresIn': '60s' }
    );
}
const createRefreshToken = (email) => {
    return jwt.sign({
        'email': email
    },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { 'expiresIn': '1d' }
    );
}

module.exports = {createAccessToken, createRefreshToken}