import { StylishJunk } from "./.get";

export default defineEventHandler(async (event) => {
  const { junkId } = getQuery(event),
    { interaction } = getRouterParams(event),
    { userId } = await readBody(event),
    junk = await StylishJunk.findById(junkId);
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
