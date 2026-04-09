const { Router } = require("express");
const users = Router();
const {
  postRegister,
  getUsers,
  getUserById,
  deleteUserById,
  updateUser,
} = require("../controllers/users.controller");

users.post("/register", postRegister);
users.get("/all", getUsers);
users.get("/:id", getUserById);
users.delete("/:id", deleteUserById);
users.put("/:id", updateUser);

module.exports = { users };
