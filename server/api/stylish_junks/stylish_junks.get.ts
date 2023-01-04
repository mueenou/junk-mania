import { Schema, model } from "mongoose";

const stylishJunkSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  heart: {
    type: Number,
    default: 0,
  },
  thumbsUp: {
    type: Number,
    default: 0,
  },
  okay: {
    type: Number,
    default: 0,
  },
  garbage: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    required: true,
  },
});

export const StylishJunk = model<any>("StylishJunk", stylishJunkSchema);

export default defineEventHandler(async (event) => {
  const junks = StylishJunk.find();
  return junks;
});
