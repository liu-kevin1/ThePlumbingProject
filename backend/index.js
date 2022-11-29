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
    console.log(req);

    let additionalSpecifiers = {
        alumni_id: req.alumniID,
        first_name: req.firstName,
        last_name: req.lastName,
        graduation_year: req.graduationYear,
        email_address: req.emailAddress,
        academy_iD: req.academyID
    }
    
    additionalSpecifiers = {
        alumni_id: 1,
        first_name: req.firstName,
        last_name: req.lastName,
        graduation_year: req.graduationYear,
        email_address: req.emailAddress,
        academy_iD: req.academyID
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

    console.log("Query: " + query);
    let result = await sqlModule.makeQuery(query);
    console.log("Result");
    console.log(result);
    res.send(result);

    // let testQuery = "SELECT first_name FROM Alumni"
    // let result = sqlModule.getTestData();

    // connection.query(function (err, result) {
    //     console.log("connecting...");
    //     console.log(result);
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("connected!");
    // });

    // return res.send("yes");
});

app.get('/createSQLData', (req, res) => {
    console.log("createSQLData");
    return;
})

app.get('/updateSQLData', (req, res) => {
    console.log("updateSQLData");
    return;
})

// for Google Sheets
app.get('/getGSData', (req, res) => {
    console.log("getGSData");
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

app.get('/writeGSData', (req, res) => {
    console.log("writeGSData");
    return;
})

app.listen(port, () => {
    console.log(`Listening to port ${port}!`)
})