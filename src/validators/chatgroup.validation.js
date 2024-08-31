import Joi from "joi";

const createChartGroupSchema = {
  body: Joi.object({
    title: Joi.string().min(6).max(100).required().messages({
      "string.min": "title must be at least 6 characters long",
      "string.max": "title must be at max 100 characters long",
      "string.empty": "title is required",
      "any.required": "title is required",
    }),
    passcode: Joi.string().min(6).max(10).required().messages({
      "string.min": "passcode must be at least 6 characters long",
      "string.max": "passcode must be at max 10 characters long",
      "string.empty": "passcode is required",
      "any.required": "passcode is required",
    }),
  }),
};

export { createChartGroupSchema };
