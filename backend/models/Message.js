import { mongoose, Schema } from "mongoose";
import mongooseStripHtmlTags from "mongoose-strip-html-tags";
mongooseStripHtmlTags(mongoose);

const messageSchema = new Schema(
  {
    message: {
      type: String,
      minLength: 1,
      maxLength: 140,
      trim: true,
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { strict: "throw" }
);

export const Message = mongoose.model("Message", messageSchema);
