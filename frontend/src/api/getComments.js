import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const getComments = (post) => {
  return fetch(`${backend}/post/${post}/comments`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "GET",
  });
};
