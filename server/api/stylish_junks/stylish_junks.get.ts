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
  // let limit = getQuery(event).limit;
  // console.log(limit);
  const junksPerPage = 3;
  const page = Number(getQuery(event).page) || 0;
  const junks = await StylishJunk.find()
    .sort({
      updatedAt: -1,
    })
    .skip(page * junksPerPage)
    .limit(junksPerPage * page);

  const count = await StylishJunk.count();
  return junks;
});
