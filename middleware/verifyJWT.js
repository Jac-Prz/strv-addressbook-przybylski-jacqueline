const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    //check we have an auth header
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader) return res.sendStatus(401);

    //verify jwt
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.JWT_ACCESS_TOKEN_SECRET,
        (err, decodedInfo) => {
            if (err) return res.sendStatus(403)
            //pass the decoded email in the jwt into the next route
            // if we want to save the addressbook users as an id, we can also pass it on here
            req.userEmail = decodedInfo.email;
            next()
        }
    )
}

module.exports = verifyJWT;
