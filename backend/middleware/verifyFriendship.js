import { statusConverter } from "../utils/statusConverter.js";
import { isValidId } from "../utils/isValidId.js";
import { getUser } from "../database/user.js";

/**
 * Middleware for verifying friendship between users.
 */
export const verifyFriendship = (req, res, next) => {
  const user = req.params.user;

  if (!isValidId(user)) {
    return res.status(404).send(statusConverter(404));
  }

  getUser(user).then((userInfo) => {
    if (
      userInfo.friends.includes(req.user._id) ||
      userInfo._id == req.user._id
    ) {
      next();
    } else {
      return res.status(403).send(JSON.stringify(statusConverter(403)));
    }
  });
};
