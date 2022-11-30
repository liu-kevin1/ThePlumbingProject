const fs = require('fs').promises;
const path = require('path');
const process = require('process');

const CREDENTIALS_PATH = path.join(process.cwd() + '/credentials/sql_credentials.json');

var mysql = require('mysql');

// Create a connection to the SQL database
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

    return await con;
}

// Send a query to the SQL database
async function makeQuery(query) {
    let con = await createConnection();

    console.log(query);
    const resultPromise = new Promise((resolve, reject) => {
        con.query(query, function (err, result, fields) {
            if (err) {
                return console.error("Error: " + err.message);
            }
            console.log("Actual Result");
            console.log(result);
            resolve(result);
        });
    });

    return resultPromise;
}

// Get the last alumni_id from the database
async function getLastAlumniID() {
    let query = "SELECT max(alumni_id) FROM Alumni";
    return await makeQuery(query);
}

module.exports = { createConnection, getTestData, makeQuery };