import Joi from 'joi';
import httpStatus from 'http-status';
import pick from '../utils/pick.js';

const schemaValidator = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorDetails = error.details.map((details) => ({
      message: details.message.split(":")[0].trim(),
      path: details.path.join('.'),
    }));

    // Construct a user-friendly error message
    const errorMessage = errorDetails
      .map((detail) => `${detail.path} ${detail.message}`)
      .join(", ");

    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: "Validation Error",
      errors: errorDetails,
    });
  }

  Object.assign(req, value);
  return next();
};

export default schemaValidator;
