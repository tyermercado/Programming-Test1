// Import the required modules
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

// Use middleware to parse JSON requests
app.use(bodyParser.json());

// Create SQLite database connection
const db = new sqlite3.Database('survey.db');

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle survey submission
app.post('/submit-survey', (req, res) => {
    const answers = req.body;

    // Store answers in the database
    db.run('INSERT INTO survey_responses (q1, q2, q3) VALUES (?, ?, ?)',
        [answers.Q1, answers.Q2, answers.Q3], function (err) {
            if (err) {
                return res.status(500).json({ error: 'Error storing survey response' });
            }

            const surveyId = this.lastID;
            res.json({ message: 'Survey submitted successfully', surveyId });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
