'use strict';

const express = require("express");
const app = express();
const fs = require("fs").promises;
const multer = require("multer");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

/**
 * Establishes a database connection to the database and returns the database object.
 * Any errors that occur should be caught in the function that calls this one.
 * @returns {sqlite3.Database} - The database object for the connection.
 */
async function getDBConnection() {
  const db = await sqlite.open({
    filename: "stocky.db",
    driver: sqlite3.Database
  });
  return db;
}

app.get('/trending/snekaers', async (req, res) => {
  try {
    let query = "SELECT * FROM Trending LIMIT 5";
    let db = await getDBConnection();
    let result = await db.all(query);
    res.json(result);
    await db.close();
  } catch {
    res.status(500);
    res.type('text');
    res.send('an error has occured in the server');
  }
});

// app.post('/lowestAsk', async(req, res) => {
//   let query = "Select "
// });




app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);