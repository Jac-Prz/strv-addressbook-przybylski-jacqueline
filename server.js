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
const User = require('./model/User')

// connect databases
dbConnect();
firebaseInit();

// middleware
app.use(cors(corsConfig))
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser()); 

// routes
app.get('/', (req, res) => {
    res.send("Address Book API");
})

//testing route - delete before production
app.delete('/deleteUser', async (req, res) => {
const response =  await User.deleteOne({email: req.body.email});
res.json(response);
})

app.use('/reg', require('./routes/reg'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

//protected route
app.use(verifyJWT);
app.use('/addresses', require('./routes/api/addresses'));


mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})


