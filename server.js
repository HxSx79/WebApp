const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('frontend'));

app.post('/api/report', (req, res) => {
    const { partName, quantity, date } = req.body;
    db.run('INSERT INTO reports (partName, quantity, date) VALUES (?, ?, ?)', [partName, quantity, date], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('Report added');
    });
});

app.get('/api/reports', (req, res) => {
    db.all('SELECT * FROM reports', [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
