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
  stateHash: string;
};

export type DiscussionUpdateAction = { baseStateHash: string } & (
  | {
      action: "addGameToArena";
      game: GameMetaData;
      user: string;
      x: number;
      y: number;
    }
  | {
      action: "approveGame";
      game_id: string;
      user: string;
    }
  | {
      action: "disApproveGame";
      game_id: string;
      user: string;
    }
  | {
      action: "moveGame";
      game_id: string;
      x: number;
      y: number;
    }
);
