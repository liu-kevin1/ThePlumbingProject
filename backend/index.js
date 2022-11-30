const sheetsModule = require('./sheetsModule');
const sqlModule = require('./sqlModule');

const express = require('express');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     baseURL: 'http://localhost:3000',
//     clientID: 'hljLjyws5AJTCoNyZxFtG9F4HqS53e6P',
//     issuerBaseURL: 'https://localhost:3000',
//     secret: 'njNz7vkd3CfPDfKCPqGccO4EKccSgkJSiPZA01buHVMld8Ou8HZG9FZ1S5-4lGGE'
//   };
  
// // The `auth` router attaches /login, /logout
// // and /callback routes to the baseURL
// app.use(auth(config));
  
// // req.oidc.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//     res.send(
//       req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
//     )
// });
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

    let result = await sqlModule.makeQuery(query);
    res.send(result);
});

app.get('/createSQLData', async (req, res) => {
    console.log("createSQLData");
    let additionalSpecifiers = {
        first_name: req.firstName,
        last_name: req.lastName,
        graduation_year: req.graduationYear,
        email_address: req.emailAddress,
        academy_id: req.academyID
    }

    additionalSpecifiers = {
        first_name: "Johnny",
        last_name: "Doe",
        graduation_year: "1987",
        email_address: "jd@gmail.com",
        academy_id: 4
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

    let result = await sqlModule.makeQuery(query);
    res.send(result);
})

app.get('/updateSQLData', async (req, res) => {
    console.log("updateSQLData");

    let additionalSpecifiers = {
        first_name: req.firstName,
        last_name: req.lastName,
        graduation_year: req.graduationYear,
        email_address: req.emailAddress,
        academy_id: req.academyID
    }

    additionalSpecifiers = {
        first_name: "Johnny2",
        last_name: "Doe2",
        graduation_year: "19872",
        email_address: "jd@gmail.com2",
        academy_id: 4
    }

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

    query += " WHERE alumni_id=" + 0;

    let result = await sqlModule.makeQuery(query);
    res.send(result);
})

// for Google Sheets
app.get('/getGSData', (req, res) => {
    console.log("getGSData");
    let range = "A1:C5";
    sheetsModule.readSheets({range: range, sheetID: "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ"});
    return res.send("Finished");
});

app.get('/writeGSData', (req, res) => {
    console.log("writeGSData");
    sheetsModule.updateSheets({query: "dummy", sheetID: "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ"});
    return res.send("Finished writing");
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`)
})