import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getFeed, getProfileFeed } from "../database/feed.js";
import { statusConverter } from "../utils/statusConverter.js";
import sanitize from "mongo-sanitize";
import { verifyFriendship } from "../middleware/verifyFriendship.js";
import { isValidId } from "../utils/isValidId.js";

export const feed = express.Router();

/**
 * Endpoint for getting the global feed
 */
feed.get("/:page", verifyToken, (req, res) => {
  const page = sanitize(req.params.page);

  getFeed(req.user._id, page)
    .then((posts) => {
      return res.status(200).send(JSON.stringify(posts));
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});

/**
 * Endpoint for getting profile feed
 */
feed.get("/:user/:page", verifyToken, verifyFriendship, (req, res) => {
  if (!isValidId(req.params.user)) {
    return res.status(404).send(statusConverter(404));
  }

  getProfileFeed(req.params.user, req.params.page)
    .then((posts) => {
      return res.status(200).send(JSON.stringify(posts));
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});
