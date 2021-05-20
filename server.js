const express = requre("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db");

const app = express();
const PORT = process.env.PORT || 3000;

