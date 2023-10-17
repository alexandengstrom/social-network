import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const addFriend = (user) => {
  return fetch(`${backend}/user/${user}/add`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "PATCH",
  });
};

export const removeFriend = (user) => {
  return fetch(`${backend}/user/${user}/remove`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "PATCH",
  });
};
