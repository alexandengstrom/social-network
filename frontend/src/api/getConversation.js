import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const getConversation = (id, friend) => {
  return fetch(`${backend}/user/${id}/conversation/${friend}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    method: "GET",
  });
};
