const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE reports (id INTEGER PRIMARY KEY, partName TEXT, quantity INTEGER, date TEXT)');
});

module.exports = db;
