import { User } from "../models/user";

export default defineEventHandler(async (event) => {
  const users = await User.find();
  return users;
});
