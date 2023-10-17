import ChatBox from "../ChatBox/ChatBox";
import styles from "./Chat.module.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { backend } from "../../config/backend";
import { getToken, getUserId } from "../../utils/jwt";
import { globalSocket } from "../../utils/socket";
import FriendOnlineStatus from "../FriendOnlineStatus/FriendOnlineStatus";
import { getUser } from "../../api/getUser";

function Chat() {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatBoxesOpen, setChatBoxesOpen] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [socket, setSocket] = useState(null);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUser(getUserId()).then((res) => {
      res.json().then((user) => {
        if (res.status == 200) {
          setUserInfo(user);
          setIsLoading(false);
        }
      });
    });
  }, []);

  useEffect(() => {
    const currentSocket = globalSocket;
    setSocket(currentSocket);
    console.log("initing socket");
  }, []);

  useEffect(() => {
    console.log("Friends online:");
    console.log(console.log(onlineFriends));
  }, [onlineFriends]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("onlineFriends", (friends) => {
      console.log("sending friends");
      console.log(friends);
      setOnlineFriends(friends);
    });

    socket.on("friendOnline", (friend) => {
      console.log("new friend online");
      if (!onlineFriends.includes(friend)) {
        setOnlineFriends([...onlineFriends, friend]);
      }
    });

    socket.on("friendOffline", (friend) => {
      console.log("friend offline");
      if (onlineFriends.length > 0) {
        setOnlineFriends((prevOnlineFriends) => {
          return prevOnlineFriends.filter((entry) => entry != friend);
        });
      }
    });

    socket.emit("requestFriends");
  }, [socket, onlineFriends]);

  const openChatBox = (user) => {
    if (chatBoxesOpen.includes(user)) {
      return;
    }
    setChatBoxesOpen((prevChatBoxesOpen) => [...prevChatBoxesOpen, user]);
  };

  const closeChatBox = (user) => {
    const tmp = [...chatBoxesOpen];
    const filtered = tmp.filter((id) => id != user);
    if (filtered == undefined) {
      setChatBoxesOpen([]);
    } else {
      setChatBoxesOpen(filtered);
    }
  };

  return (
    <>
      <div className={styles["chat-container"]}>
        <div
          className={`${styles["chat-menu"]} ${
            isChatOpen ? styles["chat-menu-open"] : "chat-menu-closed"
          }`}
        >
          <div
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={styles["chat-menu-header"]}
          >
            <h2>{onlineFriends ? onlineFriends.length : "0"} friends online</h2>
          </div>
          {isChatOpen && onlineFriends && (
            <>
              <div className="padding flex-column gap">
                <h2>Online friends:</h2>
                {!isLoading &&
                  onlineFriends.map((friend) => {
                    return (
                      <FriendOnlineStatus
                        key={friend}
                        user={friend}
                        isOnline={true}
                        onClick={openChatBox}
                      />
                    );
                  })}
                <h2>Offline friends:</h2>
                {!isLoading &&
                  userInfo.friends.map((friend) => {
                    if (!onlineFriends.includes(friend)) {
                      return (
                        <FriendOnlineStatus
                          key={friend}
                          user={friend}
                          isOnline={false}
                          onClick={openChatBox}
                        />
                      );
                    }
                  })}
              </div>
            </>
          )}
        </div>

        <div className={styles["chat-bottom-bar"]}>
          {!isLoading &&
            chatBoxesOpen.map((user) => {
              return (
                <ChatBox
                  key={user}
                  user={user}
                  onClose={closeChatBox}
                  isOnline={onlineFriends.includes(user)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Chat;
