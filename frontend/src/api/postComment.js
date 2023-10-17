import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const postComment = (post, data) => {
  return fetch(`${backend}/post/${post}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};
