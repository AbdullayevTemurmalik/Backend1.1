const express = require("express");
const Edu = express.Router();
const {
  postEdu,
  getEdus,
  getEduById,
  deleteEduById,
  updateEdu,
  searchEdus,
} = require("../controllers/edu.controller");

const {
  registerEduValidationSchema,
  updateEduValidationSchema,
} = require("../validation/eduValidation");

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

Edu.post("/create", validationSchema(registerEduValidationSchema), postEdu);
Edu.get("/all", getEdus);
Edu.get("/search", searchEdus);
Edu.get("/:id", getEduById);
Edu.delete("/:id", deleteEduById);
Edu.put("/:id", validationSchema(updateEduValidationSchema), updateEdu);

module.exports = { Edu };
