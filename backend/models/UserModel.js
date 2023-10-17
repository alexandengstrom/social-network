import { mongoose, Schema } from "mongoose";
import mongooseStripHtmlTags from "mongoose-strip-html-tags";
mongooseStripHtmlTags(mongoose);

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 24,
      trim: true,
      lowercase: true,
      stripHtmlTags: true,
    },

    lastname: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 24,
      trim: true,
      lowercase: true,
      stripHtmlTags: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 1024,
    },

    biography: {
      type: String,
      minLength: 1,
      maxLength: 140,
      stripHtmlTags: true,
      default: "This user has not written a biography yet...",
    },

    image: {
      type: String,
      default: "",
    },

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    conversations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],

    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    registered: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { strict: "throw" }
);

export const User = mongoose.model("User", userSchema);
