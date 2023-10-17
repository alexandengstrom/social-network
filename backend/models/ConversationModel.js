import { mongoose, Schema } from "mongoose";
import mongooseStripHtmlTags from "mongoose-strip-html-tags";
mongooseStripHtmlTags(mongoose);

const conversationSchema = new Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],

    date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { strict: "throw" }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);
