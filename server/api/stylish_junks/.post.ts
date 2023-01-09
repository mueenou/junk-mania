import { StylishJunk } from "./.get";

export default defineEventHandler(async (event: any) => {
  const { text, author } = await readBody(event);
  const junk = new StylishJunk({ text, author });
  try {
    junk.save();
    return { message: "created", junk };
  } catch (error) {
    return error;
  }
});
