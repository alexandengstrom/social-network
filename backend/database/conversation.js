import sanitize from "mongo-sanitize";
import { User } from "../models/UserModel.js";
import { Conversation } from "../models/ConversationModel.js";
import { getUser } from "./user.js";

/**
 * Creates a new conversation between two users.
 */
export const createConversation = (first, second) => {
  const conversation = new Conversation({ users: [first, second] });
  return conversation.save();
};

/**
 * Finds a conversation between two users
 */
export const findConversation = (first, second) => {
  return Conversation.findOne({ users: { $all: [first, second] } }).populate(
    "messages"
  );
};

/**
 * Appends a message to a conversation.
 */
export const appendMessageToConversation = (conversationId, messageId) => {
  return Conversation.findOneAndUpdate(
    { _id: conversationId },
    { $push: { messages: messageId } }
  );
};
