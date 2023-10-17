import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

/**
 * Util function to generate a token.
 */
export const generateToken = (id) => {
  const secretKey = process.env.JWT_SECRET;
  return jwt.sign({ _id: id }, secretKey, { expiresIn: "6h" });
};
