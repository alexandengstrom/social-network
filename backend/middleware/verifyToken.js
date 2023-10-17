import { statusConverter } from "../utils/statusConverter.js";
import { isTokenValid } from "../utils/isTokenValid.js";

/**
 * This middleware checks if an authorization token is provided in the request headers.
 * If not, it sends a 401 Unauthorized response. If a token is present, it validates
 * the token using the `isTokenValid` function. If the token is invalid or expired, it
 * sends a 401 Unauthorized response. If the token is valid, it attaches the user id
 * extracted from the token to the request object and proceeds to the next middleware.
 */
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send(statusConverter(401));
  }

  const token = authHeader.replace("Bearer ", "");
  const verified = isTokenValid(token);

  if (!verified) {
    return res.status(401).send(statusConverter(401));
  }

  req.user = verified;
  next();
};
