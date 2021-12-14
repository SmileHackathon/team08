import { atom } from "recoil";
import { Discussion } from "sugit_types/discussion";

const discussionBoardState = atom<Discussion | null>({
  key: "discussionBoardState",
  default: null,
});

export default discussionBoardState;
