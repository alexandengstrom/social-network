import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const deletePost = (id) => {
  return fetch(`${backend}/post/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "DELETE",
  });
};
