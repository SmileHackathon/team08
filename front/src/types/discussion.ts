import { GameMetaData } from "./game";

type DiscussionGameData = {
  game: GameMetaData;
  approver: {
    [userid: string]: boolean;
  };
  x: number;
  y: number;
};

export type Discussion = {
  name: string;
  item: {
    [appid: string]: DiscussionGameData;
  };
};
