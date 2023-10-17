/**
 * Converts a status code to a message.
 */
export const statusConverter = (status) => {
  switch (status) {
    case 400:
      return { error: "Bad Request" };
    case 401:
      return { error: "Unauthorized" };
    case 403:
      return { error: "Forbidden" };
    case 404:
      return { error: "Not Found" };
    case 405:
      return { error: "Method Not Allowed" };
    case 409:
      return { error: "Conflict" };
    case 500:
      return { error: "Internal Server Error" };
  }
};
