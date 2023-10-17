import { dateFormatter } from "../../utils/dateFormatter";
import { getUserId } from "../../utils/jwt";
import styles from "./ChatConversation.module.css";
import { useState } from "react";

function ChatConversation({ messages }) {
  return (
    <>
      {messages.map((message, index) => {
        if (message.sender != getUserId()) {
          return (
            <div
              key={index.toString() + message.date}
              className={styles["chat-message-left"]}
            >
              <p className="small light">{dateFormatter(message.date)}</p>
              <p>{message.message}</p>
            </div>
          );
        } else {
          return (
            <div
              key={index.toString() + message.date}
              className={styles["chat-message-right"]}
            >
              <p className="small">{dateFormatter(message.date)}</p>
              <p>{message.message}</p>
            </div>
          );
        }
      })}
    </>
  );
}

export default ChatConversation;
