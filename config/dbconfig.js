'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../db/schemas');

db.serialize( ()  =>  {
    buildSchemas(db);
});

module.exports = db;
