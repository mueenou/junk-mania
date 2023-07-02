import { StylishJunk } from "../../models/stylish_junk";

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);
  const stylishJunks = await StylishJunk.find({ author: userId });

  let totalInteractions = 0;
  let totalHearts = 0;
  let totalThumbsUp = 0;
  let totalThumbsOkay = 0;
  let totalGarbages = 0;

  stylishJunks.forEach((junk) => {
    totalInteractions +=
      junk.hearts.length +
      junk.thumbsUps.length +
      junk.okays.length +
      junk.garbages.length;
    totalHearts += junk.hearts.length;
    totalThumbsUp += junk.thumbsUps.length;
    totalThumbsOkay += junk.okays.length;
    totalGarbages += junk.garbages.length;
  });

  const ratioHearts =
    totalInteractions > 0 ? totalHearts / totalInteractions : 0;
  const ratioThumbsUp =
    totalInteractions > 0 ? totalThumbsUp / totalInteractions : 0;
  const ratioThumbsOkay =
    totalInteractions > 0 ? totalThumbsOkay / totalInteractions : 0;
  const ratioGarbage =
    totalInteractions > 0 ? totalGarbages / totalInteractions : 0;

  const averageRatioHearts = ratioHearts / stylishJunks.length;
  const averageRatioThumbsUp = ratioThumbsUp / stylishJunks.length;
  const averageRatioThumbsOkay = ratioThumbsOkay / stylishJunks.length;
  const averageRatioGarbages = ratioGarbage / stylishJunks.length;

  const averageRatio =
    (averageRatioHearts +
      averageRatioGarbages +
      averageRatioThumbsOkay +
      averageRatioThumbsUp) /
    4;

  let level = "";

  if (averageRatio >= 0.8) {
    level = "Junkzilla";
  } else if (averageRatio >= 0.6) {
    level = "Junkstar";
  } else if (averageRatio >= 0.4) {
    level = "Junkaholic";
  } else if (averageRatio >= 0.2) {
    level = "Junk Novice";
  } else {
    level = "Junk Bumbler";
  }

  return { averageRatio, level };
});
