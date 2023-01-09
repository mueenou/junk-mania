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

export default defineEventHandler(async (event) => {
  const junksPerPage = 6;
  const page = Number(getQuery(event).page);
  const limit = () => {
    if (page == 0) {
      return junksPerPage;
    } else {
      return junksPerPage * (page + 1);
    }
  };
  const junks = await StylishJunk.find({ garbage: { $lt: 5 } })
    .sort({
      createdAt: -1,
    })
    .limit(Number(limit()));
  return junks;
});
