// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Setup CSV writer
const csvPath = path.join(__dirname, 'clicks.csv');
const csvWriter = createObjectCsvWriter({
    path: csvPath,
    header: [
        { id: 'buttonId', title: 'Button ID' },
        { id: 'pageUrl', title: 'Page URL' },
        { id: 'timestamp', title: 'Timestamp' }
    ],
    append: true
});

// Create the CSV file if it doesn't exist
if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, '');
}

app.post('/record-click', async (req, res) => {
    const { buttonId, pageUrl, timestamp } = req.body;
    try {
        await csvWriter.writeRecords([{ buttonId, pageUrl, timestamp }]);
        res.status(200).send('Click recorded');
    } catch (error) {
        console.error('Error writing to CSV:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
