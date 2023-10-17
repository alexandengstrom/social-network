import { backend } from "../config/backend";
import { getToken } from "../utils/jwt";

export const editProfilePicture = (data) => {
  return fetch(`${backend}/user/image`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    method: "PATCH",
    body: data,
  });
};
