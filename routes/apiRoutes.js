const fs = require("fs");
const path = require("path");
const jsonData = require("../db/db.json");

// Setup route for GET and POST functions

module.exports = function(app) {
    app.get("/api/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });
    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        jsonData.push(newNote);
        renderDataID(jsonData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(jsonData, null, 2), (err) => {
            if(err) throw (err)
        });
        res.json(newNote);
    });

    app.delete("/api/notes/:id", function(req,res) {
        let deletedNoteID = req.params.id;
        for ( var i =0; i <jsonData.length; i++) {
            if (deletedNoteID == jsonData[i].id) {
                jsonData.splice(i,1)
            }
        };
        renderDataID(jsonData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err
        });
        res.json(deletedNoteID);
    });

};

function renderDataID(array) {
    for (var i=0; i< array.length; i++) {
        array[i].id = i +1;
    }
}


