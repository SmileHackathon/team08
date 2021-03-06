import { createClient } from "redis";
import { Discussion, DiscussionUpdateAction } from "sugit_types/discussion";

const discussionMapTempolary = new Map<string, Discussion>();

const createDiscussion = async (name: string): Promise<string> => {
  const id = Math.floor(Math.random() * 1000000).toString(); // TODO: Unique IDの生成
  discussionMapTempolary.set(id, {
    name: name,
    item: {},
    stateHash: "initial",
    canvas: "",
  });

  return id;
};

const getDiscussion = async (
  discussionId: string
): Promise<Discussion | undefined> => {
  const mayDiscussion = discussionMapTempolary.get(discussionId);
  if (mayDiscussion) {
    return mayDiscussion;
  } else {
    const client = createClient();
    await client.connect();
    const result = await client.get(discussionId);
    await client.disconnect();

    if (result) {
      return JSON.parse(result);
    } else {
      return undefined;
    }
  }
};

const updateDiscussion = async (
  discussionId: string,
  discussion: Discussion
): Promise<Discussion> => {
  const newDiscussion = {
    ...discussion,
    stateHash: Math.random().toString(),
  };

  setImmediate(async () => {
    const client = createClient();
    await client.connect();
    await client.set(discussionId, JSON.stringify(newDiscussion));
    await client.disconnect();
  });

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
      if (
        Object.values(base.item[action.game_id].approver).filter((b) => b)
          .length === 1
      ) {
        const next = {
          ...base,
          item: {
            ...base.item,
          },
        };
        delete next.item[action.game_id];
        return next;
      } else {
        return {
          ...base,
          item: {
            ...base.item,
            [action.game_id]: {
              ...base.item[action.game_id],
              approver: {
                ...base.item[action.game_id].approver,
                [action.user]: false,
              },
            },
          },
        };
      }
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
    case "updateCanvas":
      return { ...base, canvas: action.canvas };
  }
  throw "UNDEFINED_ACTION";
};

export { createDiscussion, getDiscussion, changeDiscussion };
