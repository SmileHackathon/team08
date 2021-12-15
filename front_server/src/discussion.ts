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
  return updateDiscussion(
    discussionId,
    applyDiscussionUpdateAction(baseDiscussion, action)
  );
};

const applyDiscussionUpdateAction = (
  base: Discussion,
  action: DiscussionUpdateAction
) => {
  if (action.baseStateHash !== base.stateHash) {
    throw "ALREADY_CHANGED";
  }
  switch (action.action) {
    case "addGameToArena":
      if (base.item[action.game.id]) {
        return {
          ...base,
          item: {
            ...base.item,
            [action.game.id]: {
              ...base.item[action.game.id],
              approver: {
                ...base.item[action.game.id].approver,
                [action.user]: true,
              },
            },
          },
        };
      } else {
        return {
          ...base,
          item: {
            ...base.item,
            [action.game.id]: {
              game: action.game,
              approver: {
                [action.user]: true,
              },
              x: action.x,
              y: action.y,
            },
          },
        };
      }
    case "approveGame":
      return {
        ...base,
        item: {
          ...base.item,
          [action.game_id]: {
            ...base.item[action.game_id],
            approver: {
              ...base.item[action.game_id].approver,
              [action.user]: true,
            },
          },
        },
      };
    case "disApproveGame":
      return {
        ...base,
        item: {
          ...base.item,
          [action.game_id]: {
            ...base.item[action.game_id],
            approver: {
              ...base.item[action.game_id].approver,
              [action.user]: true,
            },
          },
        },
      };
    case "moveGame":
      return {
        ...base,
        item: {
          ...base.item,
          [action.game_id]: {
            ...base.item[action.game_id],
            x: action.x,
            y: action.y,
          },
        },
      };
  }
  throw "UNDEFINED_ACTION";
};

export { createDiscussion, getDiscussion, changeDiscussion };
