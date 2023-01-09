import { User } from "../users.get";

export default defineEventHandler(async (event) => {
  console.log("login route reached");
  const { email, password, username } = await readBody(event);
  const user = await User.findOne({ email });
  if (user) {
    return { message: "User already exist" };
  } else {
    const newUser = await new User({ email, password, username });
    try {
      newUser.save();
      return { message: "user created", user: newUser._id };
    } catch (error) {
      return { message: "server connection failed" };
    }
  }
});
