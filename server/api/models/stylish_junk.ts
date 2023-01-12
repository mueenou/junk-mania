import { Schema, model } from "mongoose";

const stylishJunkSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    hearts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thumbsUps: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    okays: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    garbages: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const StylishJunk = model<any>("StylishJunk", stylishJunkSchema);
