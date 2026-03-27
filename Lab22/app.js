const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const options = {
    key: fs.readFileSync(path.join(__dirname, 'LAB.key')).toString(),
    cert: fs.readFileSync(path.join(__dirname, 'LAB.crt')).toString()
}

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the lab 22');
})

https.createServer(options, app).listen(3443, () => console.log(`Server running at https:${3443}`));