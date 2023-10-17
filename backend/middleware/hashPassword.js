import bcrypt from "bcrypt";
import { statusConverter } from "../utils/statusConverter.js";

/**
 * This middleware takes the password provided in the request body and hashes it
 * using bcrypt. It then replaces the original password
 * in the request body with the hashed password.
 */
export const hashPassword = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(statusConverter(500));
    });
};
