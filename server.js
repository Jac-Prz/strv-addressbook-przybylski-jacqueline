require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');
const corsConfig = require('./config/corsConfig');
const dbConnect = require('./config/dbConnect');
const firebaseInit = require('./config/firebaseInit');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');

// connect databases
dbConnect();
firebaseInit();

// middleware
app.use(cors(corsConfig))
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 

// routes
app.get('/', (req, res) => { res.send("Address Book API"); });
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

//protected route
app.use(verifyJWT);
app.use('/addresses', require('./routes/api/addresses'));

//listen
mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})


