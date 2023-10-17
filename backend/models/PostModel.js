import { mongoose, Schema } from "mongoose";
import mongooseStripHtmlTags from "mongoose-strip-html-tags";
mongooseStripHtmlTags(mongoose);

const postSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 140,
      trim: true,
      stripHtmlTags: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    date: {
      type: Date,
      default: () => Date.now(),
    },

    image: {
      type: String,
      default: "",
    },
  },
  { strict: "throw" }
);

export const Post = mongoose.model("Post", postSchema);
