const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors);

// for MySQL
app.get('/getSQLData', (req, res) => {
    return;
});
app.post('/writeSQLData', (req, res) =>{
    return;
})

// for Google Sheets
app.get('/getGSData', (req, res) => {
    return;
});
app.post('/writeGSData', (req, res) =>{
    return;
})

app.listen(port, () => console.log(`Listening on port ${port}!`));