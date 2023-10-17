import mongoose from "mongoose";

/**
 * Verifies if an ID is a valid mongo ID.
 */
export const isValidId = (id) => {
  try {
    new mongoose.Types.ObjectId(id);
    return true;
  } catch (e) {
    return false;
  }
};
