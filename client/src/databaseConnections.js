async function batchUpdate(spreadsheetId, title, find, replacement) {
    const { GoogleAuth } = require('google-auth-library');
    const { google } = require('googleapis');

    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const service = google.sheets({ version: 'v4', auth });
    const requests = [];
    // Change the spreadsheet's title.
    requests.push({
        updateSpreadsheetProperties: {
            properties: {
                title,
            },
            fields: 'title',
        },
    });
    // Find and replace text.
    requests.push({
        findReplace: {
            find,
            replacement,
            allSheets: true,
        },
    });
    // Add additional requests (operations) ...
    const batchUpdateRequest = { requests };
    try {
        const response = await service.spreadsheets.batchUpdate({
            spreadsheetId,
            resource: batchUpdateRequest,
        });
        const findReplaceResponse = response.data.replies[1].findReplace;
        console.log(`${findReplaceResponse.occurrencesChanged} replacements made.`);
        return response;
    } catch (err) {
        // TODO (developer) - Handle exception
        throw err;
    }
}