import sanitize from "mongo-sanitize";
import { User } from "../models/UserModel.js";
import { Conversation } from "../models/ConversationModel.js";

/**
 * Sanitizes the input data and saves the user to the database.
 */
export const createNewUser = (data) => {
  const user = new User(sanitize(data));
  return user.save();
};

/**
 * Returns a user by id
 */
export const getUser = (id) => {
  return User.findById(id).select("-password");
};

/**
 * Delete a user by id.
 */
export const deleteUser = (id) => {
  return User.deleteOne({ _id: id });
};

/**
 * Adds a user id to the request array.
 */
export const addFriendRequest = (from, to) => {
  return User.findOneAndUpdate({ _id: to }, { $push: { requests: from } });
};

/**
 * Removes a user id from the request array.
 */
export const removeFriendRequest = (from, to) => {
  return User.findOneAndUpdate({ _id: to }, { $pull: { requests: from } });
};

/**
 * Adds a user id to the friends array.
 */
export const addFriend = (user, friend) => {
  return User.findOneAndUpdate({ _id: user }, { $push: { friends: friend } });
};

/**
 * Removes a user id from the friends array.
 */
export const removeFriend = (user, friend) => {
  return User.findOneAndUpdate({ _id: user }, { $pull: { friends: friend } });
};

/**
 * Add a conversation to the conversations array.
 */
export const addConversation = (user, conversation) => {
  return User.findOneAndUpdate(
    { _id: user },
    { $push: { conversations: conversation } }
  );
};

/**
 * Update the image url for the user.
 */
export const changeProfilePicture = (user, url) => {
  return User.findOneAndUpdate(
    { _id: user },
    { image: url },
    {
      runValidators: true,
      new: true,
    }
  );
};

/**
 * Updates the biography of the user.
 */
export const updateBiography = (user, biography) => {
  return User.findOneAndUpdate(
    { _id: user },
    { biography: biography },
    {
      runValidators: true,
      new: true,
    }
  );
};
