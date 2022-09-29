const methodNotAllowed = (req, res) => {
    res.sendStatus(405);
}
module.exports = methodNotAllowed;