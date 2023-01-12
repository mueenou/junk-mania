import { User } from "../../users/users.get";
import { StylishJunk } from "../.get";

export default defineEventHandler(async (event) => {
  console.log("here");
  const { userId } = await readBody(event);
  const user = await User.findById(userId);
  if (user.isAdmin == true) {
    try {
      await StylishJunk.deleteMany({});
      return { message: "db deleted" };
    } catch (error) {
      return error;
    }
  } else
    return { message: "You don't have authorization to make this request." };
});
