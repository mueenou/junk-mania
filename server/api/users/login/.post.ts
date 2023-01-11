import { User } from "../users.get";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const user = await User.findOne({ email });
  if (!user) {
    return { message: "user does not exist" };
  } else {
    try {
      if (user.password == password) {
        return {
          message: "user connected",
          user: { id: user._id, username: user.username, email: user.email },
        };
      }
    } catch (error) {
      return { message: "invalid password" };
    }
  }
});
