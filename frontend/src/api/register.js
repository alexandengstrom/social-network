import { backend } from "../config/backend";

export const registerUser = (data) => {
  return fetch(`${backend}/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};
