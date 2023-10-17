import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const getFeed = (page) => {
  return fetch(`${backend}/feed/${page}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "GET",
  });
};

export const getProfileFeed = (user, page) => {
  return fetch(`${backend}/feed/${user}/${page}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "GET",
  });
};
