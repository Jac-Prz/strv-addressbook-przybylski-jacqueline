const User = require('../model/User');

const handleLogout = async (req,res) => {
// frontend must also delete the access token
const cookies = req.cookies;
if (!cookies?.jwt) return res.sendStatus(204);
const refreshToken = cookies.jwt;
const currentUser = await User.findOne({refreshToken}).exec();
currentUser.refreshToken = '';
const result = await currentUser.save();
console.log(result);
res.clearCookie('jwt', {httpOnly: true, samesite: 'None', secure:true});
res.sendStatus(204)
}

module.exports = { handleLogout }