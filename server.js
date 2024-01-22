// Add this to your server.js file

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database('survey.db');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit-survey', (req, res) => {
    const answers = req.body;

    db.run('INSERT INTO survey_responses (answers) VALUES (?)',
        [JSON.stringify(answers)], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error storing survey response' });
            }

            const surveyId = this.lastID;
            res.json({ message: 'Survey submitted successfully', surveyId });
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
