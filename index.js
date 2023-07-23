'use strict';

const express = require("express");
const app = express();
const fs = require("fs").promises;
const multer = require("multer");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(multer().none());


app.use(express.static('public'));
const PORT = process.env.PORT || 8000;
app.listen(PORT);