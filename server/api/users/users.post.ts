import { User } from "../models/user";

export default defineEventHandler(async (event) => {
  const user = new User({
    username: "johnsmith",
    email: "john@example.com",
    password: "password123",
  });

  try {
    await user.save();
  } catch (error) {
    return error;
  }
  return { message: "user created", user };
});
