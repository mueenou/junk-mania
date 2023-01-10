import { StylishJunk } from "./.get";

export default defineEventHandler(async (event) => {
  console.log(getQuery(event));
  const { junkId } = getQuery(event);
  const { interaction } = getRouterParams(event);
  const { userId } = await readBody(event);
  const junk = await StylishJunk.findById(junkId);
  if (junk[interaction].includes(userId)) {
    StylishJunk.findOneAndUpdate(
      { _id: junkId },
      {
        $pull: { [interaction]: userId },
      },
      { new: true }
    ).exec((err, result) => {
      if (err) {
        return err;
      } else {
        return result;
      }
    });
  } else {
    StylishJunk.findOneAndUpdate(
      { _id: junkId },
      {
        $push: { [interaction]: userId },
      },
      { new: true }
    ).exec((err, result) => {
      if (err) {
        return err;
      } else {
        return {
          message: "rates updated",
          result,
          [interaction]: result[interaction].length,
        };
      }
    });
  }
});
