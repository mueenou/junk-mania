import { StylishJunk } from "../.get";

export default defineEventHandler(async (event: any) => {
  try {
    await StylishJunk.deleteMany({});
    return { message: "db deleted" };
  } catch (error) {
    return error;
  }
});
