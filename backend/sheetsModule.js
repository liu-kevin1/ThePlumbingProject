const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

async function querySheets({ query, sheetID }) {
    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly',
        keyFile: './credentials/google_service_credentials.json'
    });

    console.log(await auth.credentials);

    const client = await auth.getClient();
    // const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });

    const sheets = google.sheets({ version: 'v4', auth }, sheetID);

    // const { id } = query;
    console.log("Query: " + query);
    const range = `A${query}:C${query}`;
    console.log("ID: " + sheetID);
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetID,
        range: range,
    });

    // const [title, content] = response.data.values[0];
    // console.log(title, content)
    console.log("Response:");
    console.log(response.data.values);

    return response;

    return {
        props: {
            title,
            content
        }
    }
}

// export default function Post({ title, content }) {
//     return <article>
//         <h1>{title}</h1>
//         <div>{content}</div>
//     </article>
// }

module.exports = { querySheets }