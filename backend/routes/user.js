import express from "express";
import { userPostValidation } from "../middleware/userPostValidation.js";
import { statusConverter } from "../utils/statusConverter.js";
import {
  addFriend,
  addFriendRequest,
  changeProfilePicture,
  createNewUser,
  getUser,
  removeFriend,
  removeFriendRequest,
  updateBiography,
} from "../database/user.js";
import { isValidId } from "../utils/isValidId.js";
import { hashPassword } from "../middleware/hashPassword.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { findConversation } from "../database/conversation.js";
import { initConversation } from "../utils/initConversation.js";
import { uploadImage } from "../database/firebase.js";

export const user = express.Router();

/**
 * Endpoint for creating an user.
 */
user.post("/", userPostValidation, hashPassword, (req, res) => {
  createNewUser(req.body)
    .then((user) => {
      res.status(200).send(JSON.stringify(user));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});

/**
 * Endpoint for getting a user.
 */
user.get("/:id", (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  getUser(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send(statusConverter(404));
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send(statusConverter(500));
    });
});

/**
 * Endpoint for adding a user as a friend or accepting a friend request.
 */
user.patch("/:id/add", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  let user1;
  let user2;

  getUser(req.user._id).then((user) => {
    user1 = user;
    getUser(req.params.id).then((user) => {
      user2 = user;
      if (user1.friends.includes(user2._id)) {
        return res.status(400).send(JSON.stringify(statusConverter(400)));
      }

      if (user1.requests.includes(user2._id)) {
        removeFriendRequest(user2._id, user1._id)
          .then(() => {
            addFriend(user1._id, user2._id)
              .then(() => {
                addFriend(user2._id, user1._id)
                  .then(() => {
                    initConversation(user1, user2).then(() => {
                      return res.status(200).send();
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    removeFriend(user1._id, user2._id).then(() => {
                      res
                        .status(400)
                        .send(JSON.stringify(statusConverter(500)));
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                    return res
                      .status(500)
                      .send(JSON.stringify(statusConverter(500)));
                  });
              })
              .catch((err) => {
                console.error(err);
                return res
                  .status(500)
                  .send(JSON.stringify(statusConverter(500)));
              });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).send(JSON.stringify(statusConverter(500)));
          });
      } else {
        addFriendRequest(user1._id, user2._id)
          .then(() => {
            return res.status(200).send();
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).send(JSON.stringify(statusConverter(500)));
          });
      }
    });
  });
});

/**
 * Endpoint for removing another user as a friend or remove a friend request.
 */
user.patch("/:id/remove", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  let user1;
  let user2;

  getUser(req.user._id).then((user) => {
    user1 = user;
    getUser(req.params.id).then((user) => {
      user2 = user;
      if (
        !user1.friends.includes(user2._id) &&
        !user2.requests.includes(user1._id)
      ) {
        return res.status(400).send(JSON.stringify(statusConverter(400)));
      }

      if (user2.requests.includes(user1._id)) {
        removeFriendRequest(user1._id, user2._id)
          .then(() => {
            return res.status(200).send();
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).send(JSON.stringify(statusConverter(500)));
          });
      } else {
        removeFriend(user1._id, user2._id)
          .then(() => {
            removeFriend(user2._id, user1._id)
              .then(() => {
                return res.status(200).send();
              })
              .catch((err) => {
                console.error(err);
                return res
                  .status(500)
                  .send(JSON.stringify(statusConverter(500)));
              });
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).send(JSON.stringify(statusConverter(500)));
          });
      }
    });
  });
});

/**
 * Endpoint for getting a conversation with a friend.
 */
user.get("/:id/conversation/:friend", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  if (!isValidId(req.params.friend)) {
    return res.status(404).send(statusConverter(404));
  }

  findConversation(req.params.id, req.params.friend)
    .then((conversation) => {
      return res.status(200).send(
        JSON.stringify({
          id: conversation._id,
          messages: conversation.messages,
        })
      );
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});

/**
 * Endpoint for updating the profile picture.
 */
user.patch("/image", verifyToken, (req, res) => {
  uploadImage(req.files).then((imageURL) => {
    changeProfilePicture(req.user._id, imageURL)
      .then(() => {
        if (!imageURL) {
          return res.status(400).send(JSON.stringify(statusConverter(400)));
        }
        return res.status(200).send();
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send(JSON.stringify(statusConverter(500)));
      });
  });
});

/**
 * Endpoint for updating the biography.
 */
user.patch("/biography", verifyToken, (req, res) => {
  console.log(req.body);
  updateBiography(req.user._id, req.body.bio)
    .then((user) => {
      return res.status(200).send(JSON.stringify(user));
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});
