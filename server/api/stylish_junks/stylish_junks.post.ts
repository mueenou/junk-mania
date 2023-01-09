import { StylishJunk } from "./stylish_junks.get";

export default defineEventHandler(async (event) => {
  const { junkId } = getQuery(event);
  const { userId, interaction } = await readBody(event);
  let junk = await StylishJunk.findById(junkId);
  console.log(junk.hearts);
  junk[interaction].push(userId);
  if (junk[interaction].includes(userId)) {
    const index = junk[interaction].findIndex((x: any) => x == userId);
    junk = junk[interaction].splice(index, 1);
  }
  try {
    await junk.save();
    return {
      message: "junk saved successfully",
      hearts: junk[interaction].length,
    };
  } catch (error) {
    return error;
  }
  // console.log(junk);
  // return junk;
  // try {
  //   await newJunk.save();
  //   return {
  //     message: "new junk was created:" + newJunk,
  //   };
  // } catch (error) {
  //   console.error(error);
  // }
});
