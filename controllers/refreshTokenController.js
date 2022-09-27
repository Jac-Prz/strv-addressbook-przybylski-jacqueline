const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = (req, res) => {

    // get cookies.jwt aka refresh token
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    //find user with same refresh token
    const currentUser = User.findOne({ refreshToken });
    if (!currentUser) return res.sendStatus(403);

    //check that refresh token jwts match
    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET,
        (err, decodedInfo) => {
            if (err || currentUser.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    'UserInfo': {
                        'username': decodedInfo.username,
                        'id': decodedInfo._id
                    }
                },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken })
        }
    )
}

module.exports = { handleRefreshToken };