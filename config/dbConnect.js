const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_URI)
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbConnect