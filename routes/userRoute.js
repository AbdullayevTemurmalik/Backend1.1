const { Router } = require("express");
const users = Router();

const { postRegister } = require("../controllers/users.controller");
const { getUsers } = require("../controllers/users.controller");

users.post("/register", postRegister);
users.get("/all", getUsers);

module.exports = { users };
