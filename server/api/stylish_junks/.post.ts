import { StylishJunk } from "../models/stylish_junk";

export default defineEventHandler(async (event: any) => {
  const { text, author } = await readBody(event);
  const newJunk = new StylishJunk({ text, author });
  try {
    newJunk.save();
    return { message: "created" };
  } catch (error) {
    return error;
  }
});
