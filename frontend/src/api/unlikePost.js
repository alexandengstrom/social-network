import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const unlikePost = (id) => {
  return fetch(`${backend}/post/${id}/unlike`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "POST",
  });
};
