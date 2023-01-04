import { StylishJunk } from "./stylish_junks.get";

export default defineEventHandler(async (event) => {
  const { id, rating } = getQuery(event);
  switch (rating) {
    case "heart":
      const updatedJunkHeart = await StylishJunk.findByIdAndUpdate(
        id,
        {
          $inc: { heart: 1 },
        },
        { new: true } //to return the new document
      );
      return updatedJunkHeart;
      break;
    case "thumbsup":
      const updatedJunkThumbsUp = await StylishJunk.findByIdAndUpdate(
        id,
        {
          $inc: { thumbsUp: 1 },
        },
        { new: true } //to return the new document
      );
      return updatedJunkThumbsUp;
      break;
    case "okay":
      const updatedJunkOkay = await StylishJunk.findByIdAndUpdate(
        id,
        {
          $inc: { okay: 1 },
        },
        { new: true } //to return the new document
      );
      return updatedJunkOkay;
      break;
    case "garbage":
      const updatedJunkGarbage = await StylishJunk.findByIdAndUpdate(
        id,
        {
          $inc: { garbage: 1 },
        },
        { new: true } //to return the new document
      );
      return updatedJunkGarbage;
      break;
    default:
      break;
  }
});
