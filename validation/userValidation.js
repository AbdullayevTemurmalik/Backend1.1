const Joi = require("joi");

const phoneRegex = /^\+998\d{9}$/;

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

const registerValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),

  password: Joi.string()
    .trim()
    .min(8)
    .max(30)
    .pattern(passwordRegex)
    .required(),

  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().required(),
  birthday: Joi.date().required(),
  gender: Joi.string().valid("male", "female").required(),
  address: Joi.string().trim().required(),
  phones: Joi.string().pattern(phoneRegex).required(),
  car_id: Joi.string().length(24).allow(null, ""),
  house_id: Joi.string().length(24).allow(null, ""),
  edu_id: Joi.string().length(24).allow(null, ""),
});

const updateValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30),
  password: Joi.string().trim().min(8).max(30).pattern(passwordRegex),
  firstname: Joi.string().trim(),
  lastname: Joi.string().trim(),
  birthday: Joi.date(),
  gender: Joi.string().valid("male", "female"),
  address: Joi.string().trim(),
  phones: Joi.string().pattern(phoneRegex),
  car_id: Joi.string().length(24).allow(null, ""),
  house_id: Joi.string().length(24).allow(null, ""),
  edu_id: Joi.string().length(24).allow(null, ""),
});

module.exports = {
  registerValidationSchema,
  updateValidationSchema,
};
