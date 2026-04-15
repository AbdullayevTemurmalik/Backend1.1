const joi = require("joi");

const registerHouseValidationSchema = joi.object({
  region: joi.string().required().trim().min(3).max(50),
  city: joi.string().required().trim().min(3).max(50),
  house_number: joi.number().required().min(1),
  street: joi.string().required().trim().min(3).max(100),
  family_members: joi.number().required().min(1),
  location: joi.string().required().trim().min(5),
});

const updateHouseValidationSchema = joi.object({
  region: joi.string().trim().min(3).max(50),
  city: joi.string().trim().min(3).max(50),
  house_number: joi.number().min(1),
  street: joi.string().trim().min(3).max(100),
  family_members: joi.number().min(1),
  location: joi.string().trim().min(5),
});

module.exports = {
  registerHouseValidationSchema,
  updateHouseValidationSchema,
};
