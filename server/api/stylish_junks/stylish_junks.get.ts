import { Schema, model } from "mongoose";

const stylishJunkSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

export const StylishJunk = model<any>("StylishJunk", stylishJunkSchema);

export default defineEventHandler(async (event) => {
  const junksPerPage = 6;
  const page = Number(getQuery(event).page);
  const junks = await StylishJunk.find({ garbage: { $lt: 5 } })
    .sort({
      createdAt: -1,
    })
    .limit(!page ? 6 : junksPerPage * page);
  return junks;
});
