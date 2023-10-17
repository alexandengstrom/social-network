import mongoose from "mongoose";
import { DB_URI, DB_TEST_URI } from "../config/db.js";

/**
 * Connects to the database.
 */
export const startDatabase = () => {
  return mongoose.connect(DB_URI);
};

/**
 * Connects to the testing database.
 */
export const startTestDatabase = () => {
  return mongoose.connect(DB_TEST_URI);
};

/**
 * Closes the database connection.
 */
export const closeDatabase = () => {
  return mongoose.connection.close();
};

/**
 * Drop the current database.
 */
export const dropDatabase = () => {
  return mongoose.connection.dropDatabase();
};
