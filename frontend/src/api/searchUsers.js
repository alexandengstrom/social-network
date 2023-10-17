import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const searchUsers = (query) => {
  const body = {
    query: query,
  };

  return fetch(`${backend}/explore`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });
};
