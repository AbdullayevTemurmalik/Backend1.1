const { Router } = require("express");
const users = Router();
const {
  postRegister,
  getUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/users.controller");

users.post("/register", postRegister);
users.get("/all", getUsers);
users.get("/:id", getUserById);
users.delete("/:id", deleteUserById);

module.exports = { users };
