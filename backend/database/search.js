import sanitize from "mongo-sanitize";
import { User } from "../models/UserModel.js";

/**
 * Sanitizes the input data and return all users who matches the search.
 */
export const searchUser = (query) => {
  const sanitized = sanitize(query);
  const splittedQuery = sanitized.split(" ");
  const searchConditions = [];
  splittedQuery.forEach((part) => {
    const regex = new RegExp(part, "i");
    searchConditions.push({
      $or: [{ firstname: regex }, { lastname: regex }],
    });
  });

  return User.find({
    $or: searchConditions,
  }).select("-password");
};
