import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { searchUser } from "../database/search.js";
import { statusConverter } from "../utils/statusConverter.js";
export const explore = express.Router();

/**
 * Endpoint for searching users.
 */
explore.post("/", verifyToken, (req, res) => {
  searchUser(req.body.query)
    .then((results) => {
      console.log(results);
      return res.status(200).send(JSON.stringify(results));
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send(JSON.stringify(statusConverter(500)));
    });
});
