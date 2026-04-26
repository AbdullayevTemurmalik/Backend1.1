const joi = require("joi");

const registerBookValidationSchema = joi.object({
  title: joi.string().required().trim().min(2).max(100),
  author: joi.string().required().trim().min(3).max(50),
  publishYear: joi.number().required().min(1000).max(new Date().getFullYear()),
  pages: joi.number().required().min(1),
  genre: joi.string().valid("Drama", "Fantasy", "Science", "Other").required(),
  price: joi.number().required().min(0),
});

const updateBookValidationSchema = joi.object({
  title: joi.string().trim().min(2).max(100),
  author: joi.string().trim().min(3).max(50),
  publishYear: joi.number().min(1000).max(new Date().getFullYear()),
  pages: joi.number().min(1),
  genre: joi.string().valid("Drama", "Fantasy", "Science", "Other"),
  price: joi.number().min(0),
});

module.exports = {
  registerBookValidationSchema,
  updateBookValidationSchema,
};
