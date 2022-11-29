const fs = require('fs').promises;
const path = require('path');
const process = require('process');

const CREDENTIALS_PATH = path.join(process.cwd() + '/credentials/sql_credentials.json');

var mysql = require('mysql');
const { create } = require('domain');

async function createConnection() {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);

    var con = mysql.createConnection({
        host: keys.host,
        user: keys.user,
        password: keys.password,
        database: keys.database
    });

    con.connect(function (err) {
        if (err) {
            return console.error('error: ' + err.message);
        }

        console.log('Connected to the MySQL server.');
    });

    return con;
}

async function getTestData() {
    let con = await createConnection();
    let parameters = "SELECT * FROM Alumni";

    con.query(parameters, function (err, result, fields) {
        if (err) {
            return console.error("Error: " + err.message);
        }
        console.log(result);
    });
}

module.exports = { createConnection, getTestData };