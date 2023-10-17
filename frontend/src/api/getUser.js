import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const getUser = (id) => {
  return fetch(`${backend}/user/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "GET",
  });
};
