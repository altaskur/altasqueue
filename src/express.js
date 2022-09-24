// load express module
var express = require("express");

// create an express app

var app = express();
app.use(express.static("client"));

// define a route handler for the default home page

app.get("/", function (req, res) {});

// start the server listening for requests

module.exports = app;
