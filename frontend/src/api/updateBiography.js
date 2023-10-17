import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const updateBiography = (data) => {
  console.log(data);
  return fetch(`${backend}/user/biography`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(data),
  });
};
