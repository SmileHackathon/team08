type SteamAppMetaData = {
  appid: number;
  name: string;
};

let allSteamApps: SteamAppMetaData[];

fetch("/data/steam_all_apps.json")
  .then((res) => res.json())
  .then((json) => (allSteamApps = json.applist.apps));

const normalizeSearchString = (searchString: string) => {
  return searchString.toLowerCase().replace("@", "a");
};
export default async function search(searchString: string) {
  // eslint-disable-next-line no-irregular-whitespace
  const searchStrings = searchString.split(/ |　/);
  return allSteamApps.filter((app) => {
    const appName = normalizeSearchString(app.name);
    return searchStrings.every(
      (token) => appName.indexOf(normalizeSearchString(token)) !== -1
    );
  });
}
