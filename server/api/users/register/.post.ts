import { User } from "../../models/user";

export default defineEventHandler(async (event) => {
  const { email, password, username, name, lastname } = await readBody(event);
  const user = await User.findOne({ email });
  if (user) {
    return { message: "User already exist" };
  } else {
    const newUser = await new User({
      email,
      password,
      username,
      name,
      lastname,
    });
    try {
      await newUser.save();
      return {
        message: "user created",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      };
    } catch (error) {
      return { message: "server connection failed" };
    }
  }
});
