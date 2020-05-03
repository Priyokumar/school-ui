const express = require('express');
const path = require('path');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, PUT, DELETE, OPTIONS")
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
}) 

app.use(express.static(path.join(__dirname, 'dist')));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

app.listen(process.env.PORT || 2020, '0.0.0.0', () => console.log(`\nApp is running on ${2020}!`));
