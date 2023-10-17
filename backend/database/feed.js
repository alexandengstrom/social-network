import { Post } from "../models/PostModel.js";
import { getUser } from "./user.js";

/**
 * This function fetches a feed of posts for a given user's friends, including the user's own posts.
 * The feed is paginated, with an optional page parameter. It returns a Promise that resolves to
 * an array of posts, sorted by date in descending order.
 */
export const getFeed = (user, page = 1) => {
  return getUser(user).then((user) => {
    const pageSize = 10;
    const friends = user.friends.map((friend) => friend.toString());
    const alreadyFetched = (page - 1) * pageSize;

    return Post.find({ receiver: { $in: [...friends, user] } })
      .populate("sender")
      .populate("receiver")
      .sort({ date: -1 })
      .skip(alreadyFetched)
      .limit(pageSize);
  });
};

/**
 * This function fetches a feed of posts for a given user's profile, meaning all posts where the user
 * is the receiver of the post. The feed is paginated, with an
 * optional page parameter. It returns a Promise that resolves to an array of posts, sorted by date
 * in descending order.
 */
export const getProfileFeed = (user, page = 1) => {
  const pageSize = 10;
  const alreadyFetched = (page - 1) * pageSize;

  return Post.find({ receiver: user })
    .populate("sender")
    .populate("receiver")
    .sort({ date: -1 })
    .skip(alreadyFetched)
    .limit(pageSize);
};
