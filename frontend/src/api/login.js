import { backend } from "../config/backend";

export const loginUser = (data) => {
  return fetch(`${backend}/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};
