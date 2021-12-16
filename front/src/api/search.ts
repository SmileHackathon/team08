import steamAPIFile from "./steam_all_apps.json?url";

export type GameSearchResultItem = {
  appid: string;
  name: string;
};

//const allSteamApps: GameSearchResultItem[] = steamAPIFile["applist"]["apps"];

let allSteamApps: GameSearchResultItem[] = [];

fetch(steamAPIFile)
  .then((res) => res.json())
  .then((json) => (allSteamApps = json.applist.apps));

const normalizeSearchString = (searchString: string) => {
  return searchString.toLowerCase().replace("@", "a");
};

export default async function search(searchString: string) {
  // eslint-disable-next-line no-irregular-whitespace
  const searchStrings = normalizeSearchString(searchString).split(/ |　/);
  return allSteamApps
    .filter((app) => {
      const appName = normalizeSearchString(app.name);
      return searchStrings.every(
        (token) => appName.indexOf(normalizeSearchString(token)) !== -1
      );
    })
    .map((app) => {
      return {
        ...app,
        appid: "steam__" + app.appid,
      };
    })
    .sort((a, b) => a.name.length - b.name.length)
    .sort(
      (a, b) =>
        normalizeSearchString(a.name).indexOf(searchStrings[0]) -
        normalizeSearchString(b.name).indexOf(searchStrings[0])
    );
}
