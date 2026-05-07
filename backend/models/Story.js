
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const storySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    postedAt: {
      type: String,
      required: [true, "PostedAt is required"],
    },
    bookmarkedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Story = model("Story", storySchema);

export default Story;
