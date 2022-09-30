const User = require('../model/User');

const handleLogout = async (req, res) => {

    //check cookies.jwt exists. if not, OK
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
     
    //if cookies exist, find user with this token and delete it from db
    const refreshToken = cookies.jwt;
    const currentUser = await User.findOne({ refreshToken }).exec();
    currentUser.refreshToken = '';
    const result = await currentUser.save();
    //clear cookie
    res.clearCookie('jwt', { httpOnly: true, samesite: 'None', secure:true });
    res.sendStatus(204)
}

module.exports = { handleLogout }