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

app.post('/login', async(req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400);
      res.type('text');
      res.send("Missing either password or username");
    } else {
      let db = await getDBConnection();
      let email = req.body.email;
      let password = req.body.password;
      let query = "SELECT email FROM Users WHERE email = ? and password = ?";
      let result = await db.get(query, [email, password]);
      if (result) {
        res.type('text').send("successful login");
        await db.close();
      } else {
        res.status(400);
        res.type('text');
        res.send("Invalid username or password");
      }
    }
  } catch (err) {
    res.status(500);
    res.type('text');
    res.send('an error has occured in our server please check back again later');
  }
});

app.post('/user/profile', async (req, res) => {
  try {
    if (!req.body.email) {
      res.status(400);
      res.type('text');
      res.send("Missing Email");
    } else {
      let db = await getDBConnection();
      let email = req.body.email;
      let query = "SELECT * FROM Users WHERE email = ?";
      let result = await db.get(query, email);
      if (result) {
        res.json(result);
        await db.close();
      } else {
        res.status(400);
        res.type('text');
        res.send("no informaion found on user");
      }
    }
  } catch(err) {
    res.status(500);
    res.type('text');
    res.send("an error has occured in our server please try again later");
  }
})

app.post('/signup', async (req, res) => {
  try {
    if(!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
      res.status(400);
      res.type('text');
      res.send("Missing one or more sign-up parameters");
    } else {
      let db = await getDBConnection();
      let fname = req.body.firstName;
      let lname = req.body.lastName;
      let email = req.body.email;
      let password = req.body.password;
      let query = "INSERT INTO Users (email, password, fname, lname) VALUES(?, ?, ?, ?)";
      await db.run(query, [email, password, fname, lname]);
      res.status(200).send("User created successfully");
      await db.close();
    }
  } catch(err) {
    res.status(500);
    res.type('text');
    res.send("an error has occured in our server please try again later");
  }
});


app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);