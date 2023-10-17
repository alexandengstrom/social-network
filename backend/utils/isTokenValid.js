import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/**
 * Verifies if a token is valid.
 */
export const isTokenValid = (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return false;
  }
};
