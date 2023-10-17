import Joi from "joi";

/**
 * Middleware function to validate login data in the request body using Joi.
 */
export const loginPostValidation = (req, res, next) => {
  const { error } = validateData(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

const validateData = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};
