const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// cria e abre o banco
const db = new sqlite3.Database(path.resolve(__dirname, '../../database.db'));

module.exports = db;
