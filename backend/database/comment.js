import sanitize from "mongo-sanitize";
import { Comment } from "../models/CommentModel.js";

/**
 * Sanitize the data and then saves the comment in the database.
 */
export const createNewComment = (data) => {
  const postData = new Comment(sanitize(data));
  return postData.save();
};
