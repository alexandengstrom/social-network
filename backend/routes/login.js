import express from "express";
import { loginPostValidation } from "../middleware/loginPostValidation.js";
import { verifyPassword } from "../middleware/verifyPassword.js";
import { generateToken } from "../utils/generateToken.js";

export const login = express.Router();

/**
 * Endpoint for logging in, if the login information is correct a
 * jwt will be returned.
 */
login.post("/", loginPostValidation, verifyPassword, (req, res) => {
  const token = generateToken(req.body.id);
  res.status(200).send(JSON.stringify({ token: token }));
});
