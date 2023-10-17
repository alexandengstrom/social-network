import sanitize from "mongo-sanitize";
import { Message } from "../models/Message.js";
/**
 * Saves a message to the database.
 */
export const createNewMessage = (data) => {
  const message = new Message(sanitize(data));
  return message.save();
};
