const express = require("express");
const House = express.Router();

const {
  postHouse,
  getHouses,
  getHouseById,
  deleteHouseById,
  updateHouse,
  searchHouses,
} = require("../controllers/house.controller");

const {
  registerHouseValidationSchema,
  updateHouseValidationSchema,
} = require("../validation/houseValidation");

const validationSchema = (Schema) => (req, res, next) => {
  const validationResult = Schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      success: false,
      message: validationResult.error.details[0].message,
    });
  }
  next();
};

House.post(
  "/create",
  validationSchema(registerHouseValidationSchema),
  postHouse,
);
House.get("/all", getHouses);
House.get("/search", searchHouses);
House.get("/:id", getHouseById);
House.delete("/:id", deleteHouseById);
House.put("/:id", validationSchema(updateHouseValidationSchema), updateHouse);

module.exports = { House };
