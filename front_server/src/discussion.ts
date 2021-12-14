import { Discussion } from "sugit_types/discussion";
import { GameMetaData } from "sugit_types/game";

type DiscussionUpdateAction = { baseStateHash: string } & (
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
);

const discussionMapTempolary = new Map<string, Discussion>();

const createDiscussion = async (name: string): Promise<string> => {
  const id = Math.floor(Math.random() * 1000000).toString(); // TODO: Unique IDの生成
  discussionMapTempolary.set(id, {
    name: name,
    item: {},
    stateHash: "initial",
  });

  return id;
};

const getDiscussion = async (
  discussionId: string
): Promise<Discussion | undefined> => {
  return discussionMapTempolary.get(discussionId);
};

const updateDiscussion = async (
  discussionId: string,
  discussion: Discussion
): Promise<Discussion> => {
  const newDiscussion = {
    ...discussion,
    stateHash: Math.random().toString(),
  };
  discussionMapTempolary.set(discussionId, newDiscussion);
  return newDiscussion;
};

const changeDiscussion = async (
  discussionId: string,
  action: DiscussionUpdateAction
) => {
  const baseDiscussion = await getDiscussion(discussionId);
  if (!baseDiscussion) {
    throw "NoSuchDiscussion";
  }
  if (action.baseStateHash !== baseDiscussion.stateHash) {
    throw "UpdateYourState";
  }
  switch (action.action) {
    case "addGameToArena":
      return updateDiscussion(discussionId, {
        ...baseDiscussion,
        item: {
          ...baseDiscussion.item,
          [action.game.id]: {
            game: action.game,
            approver: { [action.user]: true },
            x: action.x,
            y: action.y,
          },
        },
      });
    case "approveGame":
      return updateDiscussion(discussionId, {
        ...baseDiscussion,
        item: {
          ...baseDiscussion.item,
          [action.game_id]: {
            ...baseDiscussion.item[action.game_id],
            approver: { [action.user]: true },
          },
        },
      });
    case "disApproveGame":
      return updateDiscussion(discussionId, {
        ...baseDiscussion,
        item: {
          ...baseDiscussion.item,
          [action.game_id]: {
            ...baseDiscussion.item[action.game_id],
            approver: { [action.user]: false },
          },
        },
      });
  }
  throw "NoSuchAction";
};

export { createDiscussion, getDiscussion, changeDiscussion };
