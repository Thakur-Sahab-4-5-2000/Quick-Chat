const schemaValidator = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ message: messages.join(", "), data: null });
  }

  req.validatedBody = value;
  next();
};

export default schemaValidator;
