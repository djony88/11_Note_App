const path = require("path");

// Setup route for GET functions

module.exports = function(app) {
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../notes.html"));
    });
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../index.html"));
    });

};