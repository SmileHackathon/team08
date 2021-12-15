import { GameMetaData } from "sugit_types/game";

const getGameMetaData = async (appid: string): Promise<GameMetaData> => {
  const response = await fetch(
    `${import.meta.env.FRONT_SERVER}/get_metadata/${appid}`
  );

  if (!response.ok) {
    throw "FETCH_GAME_METADATA_ERROR";
  }

  const response_json = await response.json();

  return response_json;
};

const getThumbnail = async (appid: string) => {
  if (appid.split("__")[0] === "steam") {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${
      appid.split("__")[1]
    }/capsule_sm_120.jpg`;
  }

  return (await getGameMetaData(appid)).thumbnail;
};

export { getGameMetaData, getThumbnail };
