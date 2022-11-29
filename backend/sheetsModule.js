const { GoogleAuth } = require('google-auth-library');
const { google, ValueInputOption, MajorDimension } = require('googleapis');

async function getSheets(sheetID) {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
        keyFile: './credentials/google_service_credentials.json'
    });

    const client = await auth.getClient();

    return await google.sheets({ version: 'v4', auth }, sheetID);
}

async function readSheets({ query, sheetID }) {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
        keyFile: './credentials/google_service_credentials.json'
    });

    const client = await auth.getClient();

    const sheets = await google.sheets({ version: 'v4', auth }, sheetID);
    // const sheets = await getSheets(sheetID);
    console.log(sheets);

    console.log("Query: " + query);
    const range = `A${query}:C${query}`;
    console.log("ID: " + sheetID);
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetID,
        range: range,
    });

    console.log("Response:");
    console.log(response.data.values);

    return response;
}

async function updateSheets({ query, sheetID }) {
    console.log("updateSheets");

    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
        keyFile: './credentials/google_service_credentials.json'
    });

    const client = await auth.getClient();

    const sheets = await google.sheets({ version: 'v4', auth }, sheetID);

    // const sheets = getSheets(sheetID);

    let values = [
        [
            "Test1", "Test2", "Test3"
        ],
        [
            "Test4", "Test5", "Test6"
        ],
    ];
    const resource = {
        values,
    };

    const raw = "RAW";
    const rows = "ROWS";
    const range = "A2:C3"

    try {
        const result = await sheets.spreadsheets.values.update({
            spreadsheetId: sheetID,
            range: range,
            resource: resource,
        });
        console.log('%d cells updated.', result.data.updatedCells);
        return result;
    } catch (err) {
        // TODO (Developer) - Handle exception
        throw err;
    }

    console.log("Response:");
    console.log(response.data.values);
}

// export default function Post({ title, content }) {
//     return <article>
//         <h1>{title}</h1>
//         <div>{content}</div>
//     </article>
// }

module.exports = { readSheets, updateSheets }