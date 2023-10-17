import express from "express";
import { postPostValidation } from "../middleware/postPostValidation.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addCommentToPost,
  createNewPost,
  deletePost,
  getPost,
  getPostComments,
  likePost,
  unlikePost,
} from "../database/post.js";
import { createNewComment } from "../database/comment.js";
import { statusConverter } from "../utils/statusConverter.js";
import { getUser } from "../database/user.js";
import { uploadImage } from "../database/firebase.js";
import { isValidId } from "../utils/isValidId.js";

export const post = express.Router();

/**
 * Endpoint for creating a new post.
 */
post.post("/", verifyToken, postPostValidation, (req, res) => {
  uploadImage(req.files).then((imageURL) => {
    const postData = {
      sender: req.user._id,
      receiver: req.body.receiver,
      content: req.body.content,
      image: imageURL ? imageURL : "",
    };

    createNewPost(postData)
      .then((post) => {
        return res.status(200).send(post);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send(statusConverter(500));
      });
  });
});

/**
 * Endpoint for getting a post by id
 */
post.get("/:id", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  getPost(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).send(statusConverter(404));
      }

      getUser(req.user._id)
        .then((user) => {
          const isFriend = user.friends.includes(post.receiver.toString());

          if (!isFriend && user._id.toString() != post.receiver.toString()) {
            return res.status(403).send(statusConverter(403));
          }

          return res.status(200).send(post);
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).send(statusConverter(500));
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(statusConverter(500));
    });
});

/**
 * Endpoint for deleting a post.
 */
post.delete("/:id", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  deletePost(req.params.id)
    .then(() => {
      return res.status(200).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});

/**
 * Endpoint for liking a post.
 */
post.post("/:id/like", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  getPost(req.params.id).then((post) => {
    if (!post) {
      return res.status(404).send(statusConverter(404));
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).send(JSON.stringify(statusConverter(400)));
    }

    likePost(post._id, req.user._id)
      .then(() => {
        return res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send(JSON.stringify(statusConverter(500)));
      });
  });
});

/**
 * Endpoint for unliking a post.
 */
post.post("/:id/unlike", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }

  getPost(req.params.id).then((post) => {
    if (!post) {
      return res.status(404).send(statusConverter(404));
    }

    if (!post.likes.includes(req.user._id)) {
      return res.status(400).send(JSON.stringify(statusConverter(400)));
    }

    unlikePost(post._id, req.user._id)
      .then(() => {
        return res.status(200).send();
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send(JSON.stringify(statusConverter(500)));
      });
  });
});

/**
 * Endpoint for adding a comment to a post.
 */
post.post("/:id", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }
  const comment = {
    sender: req.user._id,
    post: req.params.id,
    content: req.body.content,
  };

  createNewComment(comment)
    .then((comment) => {
      addCommentToPost(req.params.id, comment._id)
        .then(() => {
          return res.status(200).send(JSON.stringify(comment));
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).send(JSON.stringify(statusConverter(500)));
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});

/**
 * Endpoint for getting all comments for a post.
 */
post.get("/:id/comments", verifyToken, (req, res) => {
  if (!isValidId(req.params.id)) {
    return res.status(404).send(statusConverter(404));
  }
  getPostComments(req.params.id)
    .then((comments) => {
      res.status(200).send(JSON.stringify(comments));
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});
