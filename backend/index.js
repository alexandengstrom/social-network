import { corsOptions } from "./config/cors.js";
import { startDatabase } from "./database/db.js";
import { startServer } from "./server.js";

startDatabase();
const server = startServer(3000);
//configureSocket(server);
