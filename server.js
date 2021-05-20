// Setup dependencies

const express = requre("express");
const { json } = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db");

// Setup Express app
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

// Setup rout for GET nad POST functions

app.route("/api/notes")
.get(function(req, res) {
    res.json(database);
})

.post(function(req, res) {
    let jsonPath = path.join(__dirname, "/db/db.json");
    let note = req.body;
    let highID = 100;

    for(let i = 0; i < database.length; i++) {
        let singleNote = database[i];

        if (singleNote.id > highID) {
            highID = singleNote.id;
        }
    }

    note.id = highID + 1;
    database.push(note)

    fs.writeFile(jsonPath, JSON.stringify(database), function (err) {

        if (err) {
            return console.log(err);
        }
        console.log("Note saved!");
    });
    res.json(note);
});

