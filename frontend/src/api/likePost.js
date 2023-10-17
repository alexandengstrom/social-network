import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const likePost = (id) => {
  return fetch(`${backend}/post/${id}/like`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "POST",
  });
};
