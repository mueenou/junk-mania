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
  const limit = Number(getQuery(event).limit);
  const page = Number(getQuery(event).page);
  const junks = await StylishJunk.find({ garbage: { $lt: 5 } })
    .sort({
      updatedAt: -1,
    })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const count = await StylishJunk.count();
  return {
    junks,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
});
