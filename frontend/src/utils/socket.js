import { backend } from "../config/backend";
import { getToken } from "./jwt";
import io from "socket.io-client";

const token = getToken();
export const globalSocket = io(backend, {
  auth: { token: token },
});
