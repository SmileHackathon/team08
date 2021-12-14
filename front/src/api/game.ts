const getGameMetaData = async (appid: string) => {
  return {
    name: "Game for DEMO",
    thumbnail: "https://placehold.jp/1280x720.png",
    images: [
      "https://placehold.jp/50538f/ffffff/1280x720.png",
      "https://placehold.jp/ac43ba/ffffff/1280x720.png",
      "https://placehold.jp/43ba57/ffffff/1280x720.png",
    ],
    url: "https://google.com/",
    id: appid,
  };
};

export { getGameMetaData };
