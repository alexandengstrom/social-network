import sanitize from "mongo-sanitize";
import { Post } from "../models/PostModel.js";

/**
 * Sanitizes the input data and saves the post to the database.
 */
export const createNewPost = (data) => {
  const postData = new Post(sanitize(data));
  return postData.save();
};

/**
 * Returns a post by id.
 */
export const getPost = (id) => {
  return Post.findById(id);
};

/**
 * Updates a post.
 */
export const updatePost = (id, update) => {
  return Post.findOneAndUpdate({ _id: id }, sanitize(update), {
    runValidators: true,
    new: true,
  });
};

/**
 * Deletes a post.
 */
export const deletePost = (id) => {
  return Post.deleteOne({ _id: id });
};

/**
 * Add a user to the likes-array of a post.
 */
export const likePost = (post, user) => {
  return Post.findOneAndUpdate({ _id: post }, { $push: { likes: user } });
};

/**
 * Remove a user from the likes-array of a post.
 */
export const unlikePost = (post, user) => {
  return Post.findOneAndUpdate({ _id: post }, { $pull: { likes: user } });
};

/**
 * Add a comment to a post.
 */
export const addCommentToPost = (post, comment) => {
  return Post.findOneAndUpdate({ _id: post }, { $push: { comments: comment } });
};

/**
 * Get all comments of a post.
 */
export const getPostComments = (post) => {
  return Post.findById(post)
    .populate({
      path: "comments",
      populate: {
        path: "sender",
        model: "User",
      },
    })
    .select("comments");
};
