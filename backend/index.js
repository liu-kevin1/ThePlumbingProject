const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

var credentialsFileName = "./credentials.json";
var credentials;

try {
    credentials = require(credentialsFileName)
}
catch (err) {
    credentials = {}
    console.log("unable to read file '" + credentialsFileName + "': ", err)
}

console.log("session secret is:", credentials)

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "",
    user: "",
    password: ""
});

app.use(cors());

app.get('/', (req, res) => res.send("Home"));
app.get('/hello', (req, res) => res.send("hello"));

// for MySQL
app.get('/getSQLData', (req, res) => {
    console.log("this has ran");
    con.connect(function (err) {
        console.log("connecting...");
        if (err) {
            throw err;
        }
        console.log("connected!");
    });
    return res.send("yes");
});
app.post('/writeSQLData', (req, res) => {
    return;
})

// for Google Sheets
app.get('/getGSData', (req, res) => {
    return;
});
app.post('/writeGSData', (req, res) => {
    return;
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`)
})