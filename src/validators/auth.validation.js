import Joi from "joi";

const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};

const registrationSchema = {
  param: Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters long",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
    username: Joi.string().min(6).required().messages({
      "string.min": "Username must be at least 6 characters long",
      "string.empty": "Username is required",
      "any.required": "Username is required",
    }),
  }),
};

export { loginSchema, registrationSchema };
