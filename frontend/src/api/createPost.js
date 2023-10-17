import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const createPost = (data) => {
  return fetch(`${backend}/post`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    method: "POST",
    body: data,
  });
};
