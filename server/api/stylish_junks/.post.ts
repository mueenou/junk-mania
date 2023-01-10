import { StylishJunk } from "./.get";

export default defineEventHandler(async (event: any) => {
  const { text, author, username } = await readBody(event);
  const newJunk = new StylishJunk({ text, author, username });
  try {
    newJunk.save();
    return { message: "created" };
  } catch (error) {
    return error;
  }
});
