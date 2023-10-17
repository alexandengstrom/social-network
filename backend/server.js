import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import http from "http";
import { Server } from "socket.io";

import { user } from "./routes/user.js";
import { login } from "./routes/login.js";
import { post } from "./routes/post.js";
import { feed } from "./routes/feed.js";
import { explore } from "./routes/explore.js";
import { configureSocket } from "./socket.js";

const app = express();

const server = http.createServer(app);
export const io = new Server(server, { cors: corsOptions });
configureSocket(io);

app.use(express.json());
app.use(cors(corsOptions));
app.use(fileUpload());

app.use("/user", user);
app.use("/login", login);
app.use("/post", post);
app.use("/feed", feed);
app.use("/explore", explore);

export const startServer = (port) => {
  return server.listen(port, () => {
    console.log("Server started on port: " + port);
  });
};
