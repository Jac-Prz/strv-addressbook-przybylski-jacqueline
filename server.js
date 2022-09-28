require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsConfig = require('./config/corsConfig');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const firebaseInit = require('./config/firebaseInit');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT;

dbConnect();
firebaseInit();

// middleware
app.use(cors(corsConfig))
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 

// routes
app.get('/', (req, res) => {
    res.send('hello world');
})
app.use('/reg', require('./routes/reg'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT);
app.use('/addresses', require('./routes/api/addresses'));


app.all('*', (req, res) => {
    res.status(404).json({ "message": "404 - not found" })
})


// if connected to mongoDB, listen for requests
mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})

