import { Discussion, DiscussionUpdateAction } from "sugit_types/discussion";

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
): Promise<Discussion> => {
  const baseDiscussion = await getDiscussion(discussionId);
  if (!baseDiscussion) {
    throw "NO_SUCH_OBJECT";
  }
  if (action.baseStateHash !== baseDiscussion.stateHash) {
    throw "ALREADY_CHANGED";
  }
  switch (action.action) {
    case "addGameToArena":
      if (baseDiscussion.item[action.game.id]) {
        return updateDiscussion(discussionId, {
          ...baseDiscussion,
          item: {
            ...baseDiscussion.item,
            [action.game.id]: {
              ...baseDiscussion.item[action.game.id],
              approver: {
                ...baseDiscussion.item[action.game.id].approver,
                [action.user]: true,
              },
            },
          },
        });
      } else {
        return updateDiscussion(discussionId, {
          ...baseDiscussion,
          item: {
            ...baseDiscussion.item,
            [action.game.id]: {
              game: action.game,
              approver: {
                [action.user]: true,
              },
              x: action.x,
              y: action.y,
            },
          },
        });
      }
    case "approveGame":
      return updateDiscussion(discussionId, {
        ...baseDiscussion,
        item: {
          ...baseDiscussion.item,
          [action.game_id]: {
            ...baseDiscussion.item[action.game_id],
            approver: {
              ...baseDiscussion.item[action.game_id].approver,
              [action.user]: true,
            },
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
            approver: {
              ...baseDiscussion.item[action.game_id].approver,
              [action.user]: true,
            },
          },
        },
      });
    case "moveGame":
      return updateDiscussion(discussionId, {
        ...baseDiscussion,
        item: {
          ...baseDiscussion.item,
          [action.game_id]: {
            ...baseDiscussion.item[action.game_id],
            x: action.x,
            y: action.y,
          },
        },
      });
  }
  throw "UNDEFINED_ACTION";
};

export { createDiscussion, getDiscussion, changeDiscussion };
