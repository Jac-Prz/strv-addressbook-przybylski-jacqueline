const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) return res.sendStatus(401); //unauthorised
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        (err, decodedInfo) => {
            if (err) return res.sendStatus(403) //forbidden
            //we pass in a username to the jwt. so now the username will be equal to the decoded info from the JWT
            req.user = decodedInfo.UserInfo.username;
            req.id = decodedInfo.UserInfo.id;
            next()
        }
    )
}

module.exports = verifyJWT;
