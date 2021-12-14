import fetch from "node-fetch";
import { GameMetaData } from "sugit_types/game";

export default async function getSteamGameMetaData(
  appId: number
): Promise<GameMetaData> {
  const response = await fetch(
    `https://store.steampowered.com/api/appdetails?appids=${appId}`,
    {
      headers: {
        "User-Agent": "sugit/1.0 cathiecode gmail com",
      },
    }
  );

  const response_json: any = await response.json();

  if (
    !response_json ||
    typeof response_json !== "object" ||
    !response_json[appId] ||
    !response_json[appId].success
  ) {
    throw "API_CALL_ERROR";
  }

  const data = response_json[appId]["data"];
  return {
    id: `steam__${appId}`,
    name: data.name,
    thumbnail: `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/capsule_sm_120.jpg`,
    images: data.screenshots.map(
      (screenshot: any) => screenshot.path_thumbnail || screenshot.path_full
    ),
    url: `https://store.steampowered.com/app/${appId}/`,
  };
}
