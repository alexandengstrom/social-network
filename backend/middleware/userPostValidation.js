import Joi from "joi";
import { User } from "../models/UserModel.js";
import { statusConverter } from "../utils/statusConverter.js";

/**
 * Middleware for validating user registration data in the request body using Joi and checking for duplicate emails.
 */
export const userPostValidation = (req, res, next) => {
  const { error } = validateData(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).send(statusConverter(409));
      }
      next();
    })
    .catch((err) => {
      console.error(err);
    });
};

const validateData = (data) => {
  const schema = Joi.object().keys({
    firstname: Joi.string().min(1).max(24).required(),
    lastname: Joi.string().min(1).max(24).required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
  });

  return schema.validate(data);
};
