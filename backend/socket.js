import { isTokenValid } from "./utils/isTokenValid.js";
import { getUser } from "./database/user.js";
import { createNewMessage } from "./database/message.js";
import { appendMessageToConversation } from "./database/conversation.js";

const onlineUsers = {};

export const configureSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return;
    }

    const decodedUser = isTokenValid(token);

    if (!decodedUser) {
      return;
    }
    
    onlineUsers[decodedUser._id] = socket;
    socket.user = decodedUser._id;

    return next();
  });

  io.on("initial-headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
  });

  io.on("headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:5173";
  });

  io.on("connection", (socket) => {
    emitFriendsOnline(socket);
    notifyFriends(socket.user, "friendOnline");

    socket.on("newMessage", (data) => {
      if (data.message.length > 140 || data.message.length < 1) {
        return;
      }

      const message = {
        message: data.message,
        sender: data.sender,
      };

      createNewMessage(message)
        .then((savedMessage) => {
          appendMessageToConversation(data.room, savedMessage)
            .then(() => {
              const response = {
                id: savedMessage._id,
                sender: savedMessage.sender,
                message: savedMessage.message,
                date: savedMessage.date,
                room: data.room,
              };
              onlineUsers[data.recipient] &&
                onlineUsers[data.recipient].emit("newMessage", response);

              onlineUsers[data.sender] &&
                onlineUsers[data.sender].emit("newMessage", response);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    });

    socket.on("logout", () => {
      emitFriendsOnline(socket);
      notifyFriends(socket.user, "friendOffline");

      if (socket.user && onlineUsers[socket.user]) {
        delete onlineUsers[socket.user];
      }
    });

    socket.on("login", () => {
      emitFriendsOnline(socket);
      notifyFriends(socket.user, "friendOnline");
    });

    socket.on("disconnect", () => {
      emitFriendsOnline(socket);
      notifyFriends(socket.user, "friendOffline");

      if (socket.user && onlineUsers[socket.user]) {
        delete onlineUsers[socket.user];
      }
    });
  });
};

const notifyFriends = (userId, event) => {
  getUser(userId)
    .then((user) => {
      const friends = user.friends;
      friends.map((friend) => {
        if (onlineUsers[friend]) {
          onlineUsers[friend].emit(event, userId);
        }
      });
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

const emitFriendsOnline = (socket) => {
  getUser(socket.user)
    .then((user) => {
      let onlineFriends = [];
      user.friends.map((friend) => {
        if (onlineUsers[friend]) {
          onlineFriends.push(friend);
        }
      });
      socket.emit("onlineFriends", onlineFriends);
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};
