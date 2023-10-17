import Joi from "joi";

/**
 * Middleware for validating post data in the request body using Joi.
 */
export const postPostValidation = (req, res, next) => {
  const { error } = validateData(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

const validateData = (data) => {
  const schema = Joi.object().keys({
    receiver: Joi.string().min(1).required(),
    content: Joi.string().min(1).max(140).required(),
    image: Joi.optional(),
  });

  return schema.validate(data);
};
