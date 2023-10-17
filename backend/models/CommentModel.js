import { mongoose, Schema } from "mongoose";
import mongooseStripHtmlTags from "mongoose-strip-html-tags";
mongooseStripHtmlTags(mongoose);

const commentSchema = new Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    sender: {
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

    date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { strict: "throw" }
);

export const Comment = mongoose.model("Comment", commentSchema);
