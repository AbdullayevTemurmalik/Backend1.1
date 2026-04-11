const joi = require("joi");

const registerEduValidationSchema = joi.object({
  city: joi.string().required().trim().min(3).max(30),
  street: joi.string().required().trim().min(3).max(30),
  center_name: joi.string().required().trim().min(3).max(30),
  branch: joi.string().trim().min(3).max(30),
  rating: joi.number().min(0).max(5),
});

const updateEduValidationSchema = joi.object({
  city: joi.string().trim().min(3).max(30),
  street: joi.string().trim().min(3).max(30),
  center_name: joi.string().trim().min(3).max(30),
  branch: joi.string().trim().min(3).max(30),
  rating: joi.number().min(0).max(5),
});

module.exports = {
  registerEduValidationSchema,
  updateEduValidationSchema,
};
