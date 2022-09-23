require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// routes
app.use('/addresses', require('./routes/api/addresses'));

//route handlers
app.get('/', (req, res) => {
    res.send("Hello World");
})
app.all('*', (req, res) => {
    res.status(404).json({ err: "404 - not found" })
})

//listen on port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})