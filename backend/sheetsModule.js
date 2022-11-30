const { GoogleAuth } = require('google-auth-library');
const { google, ValueInputOption, MajorDimension } = require('googleapis');

const sheetID = "1oOohmDEw3R2AU8aHwt9-KWGpFCQSYz08HsGgcXQEDLQ";

// Get the authenticated Google Sheets object
async function getSheets() {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
        keyFile: './credentials/google_service_credentials.json'
    });

    const client = await auth.getClient();

    return google.sheets({ version: 'v4', auth });
}

// Return the values within <range>
async function readSheets({ range }) {
    const sheets = await getSheets();

    const response = sheets.spreadsheets.values.get({
        spreadsheetId: sheetID,
        range: range,
    });

    // console.log("Response:");
    // console.log(response.data.values);

    return response;
}

// Replace the values within <range> with <values>
async function updateSheets({ values, range }) {
    const sheets = await getSheets(sheetID);
    
    // let values = [
    //     [
    //         "Test1", "Test2", "Test3"
    //     ],
    //     [
    //         "Test4", "Test5", "Test6"
    //     ],
    // ];
    const resource = {
        values,
    };

    try {
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId: sheetID,
            range: range,
            resource: resource,
            valueInputOption: "RAW"
        });
        console.log('%d cells updated.', result.data.updatedCells);
        return result;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }
}

module.exports = { readSheets, updateSheets }