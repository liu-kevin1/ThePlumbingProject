const sheetsModule = require('./sheetsModule');
const sqlModule = require('./sqlModule');
const databaseSync = require('./databaseSync');

const express = require('express');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())

app.get('/hello', (req, res) => res.send("hello"));

// for MySQL
app.get('/getSQLData', async (req, res) => {
    console.log("getSQLData");

    let additionalSpecifiers = {
        alumni_id: req.alumniID,
        first_name: req.firstName,
        last_name: req.lastName,
        graduation_year: req.graduationYear,
        email_address: req.emailAddress,
        academy_id: req.academyID
    }

    let query = "SELECT * FROM Alumni ";

    let first = true;

    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
                query += "WHERE ";
            } else {
                query += "AND ";
            }
            query += key + "=" + additionalSpecifiers[key];
        }
    }

    let result = await sqlModule.makeQuery({query: query});
    res.send(result);
});

app.get('/createSQLData', async (req, res) => {
    // console.log(req)
    console.log("createSQLData");
    let additionalSpecifiers = {
        alumni_id: req.query.alumniID,
        first_name: req.query.firstName,
        last_name: req.query.lastName,
        graduation_year: req.query.graduationYear,
        email_address: req.query.emailAddress,
        academy_id: req.query.academyID
    }

    let query = "INSERT INTO Alumni (";

    let first = true;
    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
            } else {
                query += ", ";
            }
            query += key
        }
    }
    query += ") VALUES (";

    first = true;

    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
            } else {
                query += ", ";
            }
            query += '"' + additionalSpecifiers[key] + '"';
        }
    }

    query += ");";

    let result = await sqlModule.makeQuery({query: query});
    res.send(result);
})

app.get('/updateSQLData', async (req, res) => {
    console.log("updateSQLData");

    let additionalSpecifiers = {
        first_name: req.query.firstName,
        last_name: req.query.lastName,
        graduation_year: req.query.graduationYear,
        email_address: req.query.emailAddress,
        academy_id: req.query.academyID
    }

    // additionalSpecifiers = {
    //     first_name: "Johnny2",
    //     last_name: "Doe2",
    //     graduation_year: "19872",
    //     email_address: "jd@gmail.com2",
    //     academy_id: 4
    // }
    console.log(additionalSpecifiers);
    
    let query = "UPDATE Alumni ";

    let first = true;

    for (key in additionalSpecifiers) {
        let specifier = additionalSpecifiers[key];
        if (specifier != undefined) {
            if (first) {
                first = false;
                query += "SET ";
            } else {
                query += ", ";
            }
            query += key + "=" + '"' + additionalSpecifiers[key] + '"';
        }
    }

    query += " WHERE alumni_id=" + req.query.alumniID;

    let result = await sqlModule.makeQuery({query: query});
    res.send(result);
})

// for Google Sheets
app.get('/getGSData', (req, res) => {
    console.log("getGSData");
    let range = "A1:C5";
    sheetsModule.readSheets({range: range});
    return res.send("Finished");
});

app.get('/writeGSData', (req, res) => {
    console.log("writeGSData");
    sheetsModule.updateSheets({query: "dummy"});
    return res.send("Finished writing");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`)
})

databaseSync.sync();