require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const app = require('./server');

mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})