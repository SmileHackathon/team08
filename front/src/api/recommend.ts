import recommends from "sugit_static_data/recommend.json";

export type Recommend = {
  name: string;
  url: string;
  appid: string;
};

export default async function getRecommend() {
  return recommends;
}
