const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    roles: {
        User: {
            type: Number, 
            default: 1000
        }
    }, 
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);