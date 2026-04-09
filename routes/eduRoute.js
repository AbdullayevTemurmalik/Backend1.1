const express = require("express");
const Edu = express.Router();
const { postEdu, getEdus } = require("../controllers/edu.controller");

Edu.post("/create", postEdu);
Edu.get("/all", getEdus);

module.exports = { Edu };
