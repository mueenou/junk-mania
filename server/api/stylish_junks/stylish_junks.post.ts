import { StylishJunk } from "./stylish_junks.get";

export default defineEventHandler(async (event) => {
  const { text, author } = await readBody(event);
  const newJunk = new StylishJunk({ text, author });
  try {
    await newJunk.save();
    return {
      message: "new junk was created:" + newJunk,
    };
  } catch (error) {
    console.error(error);
  }
});
