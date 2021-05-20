// Set up dependencies

const express = requre("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db");

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true}));

app.use(express.json());

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes", function (req, res){
    res.sendFile(path.join(__dirname, "notes.html"));
})

// Set up rout for GET nad POST functions

