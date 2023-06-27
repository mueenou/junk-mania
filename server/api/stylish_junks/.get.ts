import { StylishJunk } from "../models/stylish_junk";

export default defineEventHandler(async (event) => {
  const junksPerPage = 2;
  const page = Number(getQuery(event).page);
  const limit = () => {
    if (page == 0) {
      return junksPerPage;
    } else {
      return junksPerPage * (page + 1);
    }
  };
  const junks = await StylishJunk.find({
    $expr: { $lt: [{ $size: "$garbages" }, 5] },
  })
    .populate("author", "username name lastname")
    .sort({
      createdAt: -1,
    })
    .limit(Number(limit()));

  return junks;
});
