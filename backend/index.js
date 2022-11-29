const sheetsModule = require('./sheetsModule');
const sqlModule = require('./sqlModule');

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());

app.get('/', (req, res) => res.send("Home"));
app.get('/hello', (req, res) => res.send("hello"));

// for MySQL
app.get('/getSQLData', (req, res) => {
    console.log("this has ran");

    // let testQuery = "SELECT first_name FROM Alumni"
    let result = sqlModule.getTestData();

    // connection.query(function (err, result) {
    //     console.log("connecting...");
    //     console.log(result);
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("connected!");
    // });

    return res.send("yes");
});
app.post('/writeSQLData', (req, res) => {
    return;
})

// for Google Sheets
app.get('/getGSData', (req, res) => {
    let query = 4;
    sheetsModule.querySheets({query: query, sheetID: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"});

    // return;
    
    // let result = sheetsModule.authorize().then(sheetsModule.listMajors).catch(console.error);
    // console.log("Result: " + result);
    // let id = "1NquMNhaDF4reH17FBJzfS6Tfkvv6WFjid4u8TlYiGrM";
    // let title = "Test Title 1";
    // let find = "FindMe";
    // let replacement = "Replaced";
    // let result = databaseConnections.batchUpdate(id, title, find, replacement);
    // console.log("Finished sheets API call");
    // console.log("Result: " + result);
    // let authorizationUrl = "https://localhost:8000/getGSDataFinished";
    // return res.writeHead(301, { "Location": authorizationUrl });;
    return res.send("Finished");
});
app.post('/writeGSData', (req, res) => {
    return;
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`)
})