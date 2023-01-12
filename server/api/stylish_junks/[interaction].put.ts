import { StylishJunk } from "./.get";

export default defineEventHandler(async (event) => {
  const { junkId } = getQuery(event);
  const { interaction } = getRouterParams(event);
  const { userId } = await readBody(event);
  try {
    const post = await StylishJunk.findById(junkId);
    if (!post) {
      return { message: "Junk not found" };
    }
    if (["hearts", "thumbsUps", "okays", "garbages"].indexOf(interaction) < 0) {
      return { message: "Invalid interaction" };
    }
    // check if the user already have the same reaction, if yes remove it
    if (post[interaction].findIndex((val: any) => val.equals(userId)) !== -1) {
      post[interaction] = post[interaction].filter(
        (val: any) => !val.equals(userId)
      );
      await post.save();
      return { message: "Removed interaction" };
    }
    // remove all other interaction
    post["hearts"] = post["hearts"].filter((val: any) => !val.equals(userId));
    post["thumbsUps"] = post["thumbsUps"].filter(
      (val: any) => !val.equals(userId)
    );
    post["okays"] = post["okays"].filter((val: any) => !val.equals(userId));
    post["garbages"] = post["garbages"].filter(
      (val: any) => !val.equals(userId)
    );
    // add the new interaction
    post[interaction].push(userId);
    await post.save();
    return { message: "interaction added" };
  } catch (error) {
    return error;
  }
});
