import { readdir, readFile } from "fs/promises";
import { GameMetaData } from "sugit_types/game";
import data from "sugit_static_data/recommend.json";
import path from "path";

const data_map = data as {
  [id: string]: { name: string; url: string; appid: string };
};

export default async function getStaticGameMetaData(
  id: string
): Promise<GameMetaData> {
  const game_id = `static__${id}`;

  return {
    name: data_map[game_id].name,
    thumbnail: `/recommends/${id}/logo.png`,
    images: (await readdir(path.join("public", "recommends", id, "img"))).map(
      (fileName) => `/recommends/${id}/img/${fileName}`
    ),
    url: data_map[game_id].url,
    id: id,
  };
}
