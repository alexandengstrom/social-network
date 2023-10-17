import bcrypt from "bcrypt";
import { User } from "../models/UserModel.js";
import sanitize from "mongo-sanitize";
import { statusConverter } from "../utils/statusConverter.js";

/**
 * This middleware checks if the provided email exists in the database, retrieves
 * the corresponding user's hashed password, and compares it with the provided password
 * using bcrypt. If the email doesn't exist or the password doesn't match, it sends
 * a 401 Unauthorized response. If the email and password are valid, it attaches the
 * user's ID to the request body and proceeds to the next middleware.
 */
export const verifyPassword = (req, res, next) => {
  User.find({ email: sanitize(req.body.email) })
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).send(statusConverter(401));
      }

      bcrypt
        .compare(req.body.password, user[0].password)
        .then((result) => {
          if (!result) {
            return res.status(401).send(statusConverter(401));
          }

          req.body.id = user[0]._id;
          next();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send(statusConverter(500));
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(statusConverter(500));
    });
};
