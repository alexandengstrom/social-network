import { createConversation } from "../database/conversation.js";
import { addConversation } from "../database/user.js";

/**
 * Initialize a new conversation between two users.
 */
export const initConversation = (first, second) => {
  return createConversation(first, second).then((conversation) => {
    return addConversation(first, conversation).then(() => {
      return addConversation(second, conversation);
    });
  });
};
