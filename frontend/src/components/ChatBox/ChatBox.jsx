import ChatConversation from "../ChatConversation/ChatConversation";
import styles from "./ChatBox.module.css";
import { useEffect, useState, useRef } from "react";
import { getUser } from "../../api/getUser";
import { capitalize } from "../../utils/capitalizeString";
import { getConversation } from "../../api/getConversation";
import { getUserId } from "../../utils/jwt";
import { globalSocket } from "../../utils/socket";
import closeIcon from "./assets/close.png";
import { Link } from "react-router-dom";

function ChatBox({ user, isOnline, onClose }) {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [currentRoom, setCurrentRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [validMessage, setValidMessage] = useState(true);

  const chatboxMessagesRef = useRef(null);

  useEffect(() => {
    if (chatboxMessagesRef.current) {
      chatboxMessagesRef.current.scrollTop =
        chatboxMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const currentSocket = globalSocket;
    setSocket(currentSocket);
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("newMessage", (data) => {
      if (data.room == currentRoom) {
        updateMessages({
          _id: data._id,
          sender: data.sender,
          message: data.message,
          date: data.date,
        });
        setIsChatOpen(true);
      }
    });

    socket.on("confirmedMessage", (data) => {
      handleConfirmedMessage(data);
    });
  }, [currentRoom]);

  useEffect(() => {
    getUser(user).then((res) => {
      res.json().then((userInformation) => {
        setUserInfo(userInformation);
        findRoomId();
      });
    });
  }, []);

  const findRoomId = () => {
    getConversation(getUserId(), user).then((res) => {
      res.json().then((data) => {
        setCurrentRoom(data.id);
        setMessages(data.messages);
        setIsLoading(false);
      });
    });
  };

  const onSubmit = () => {
    socket.emit("newMessage", {
      recipient: user,
      sender: getUserId(),
      message: message,
      room: currentRoom,
    });
    setMessage("");
  };

  const updateMessages = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleConfirmedMessage = (data) => {
    console.log("here");
    console.log(currentRoom);
    if (data.room == currentRoom) {
      updateMessages(data);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    setValidMessage(e.target.value.length < 141);
  };

  return (
    <>
      <div
        className={`${styles["chatbox-container"]} ${
          isChatOpen ? styles["chatbox-open"] : ""
        }`}
      >
        <div
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={styles["chatbox-header"]}
        >
          {!isLoading && (
            <>
              <div
                className={`${styles["user-online-status"]} ${
                  isOnline
                    ? styles["user-online-icon"]
                    : styles["user-offline-icon"]
                }`}
              ></div>
              <Link
                className={styles["chatbox-link"]}
                onClick={(e) => e.stopPropagation()}
                to={"user/" + userInfo._id}
              >
                {capitalize(userInfo.firstname)} {capitalize(userInfo.lastname)}
              </Link>
            </>
          )}
          <img
            src={closeIcon}
            onClick={() => onClose(user)}
            className={styles["close-button"]}
            alt="close icon"
          />
        </div>
        <div className={styles["chatbox-conversation"]}>
          <div ref={chatboxMessagesRef} className={styles["chatbox-messages"]}>
            <ChatConversation messages={messages} />
          </div>
          <div className="flex-row">
            <input
              value={message}
              onChange={handleInputChange}
              className={`${styles["chatbox-input-field"]} ${
                validMessage ? "" : styles["invalid-message"]
              }`}
            />
            <button
              onClick={() => onSubmit()}
              className={styles["chatbox-send-button"]}
              disabled={!validMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
