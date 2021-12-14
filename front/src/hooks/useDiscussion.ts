import { useEffect } from "react";
import { useRecoilState } from "recoil";
import discussionBoardState from "../components/atoms/DiscussionBoardAtom";

export default function useDiscussion(discussId: string) {
  const [board, setBoard] = useRecoilState(discussionBoardState);

  useEffect(() => {
    // TODO: 実装
    setBoard({
      name: "unnamed",
      item: {
        steam_19283: {
          approver: {},
          game: {
            name: "Game for DEMO",
            thumbnail: "https://placehold.jp/1280x720.png",
            images: [
              "https://placehold.jp/50538f/ffffff/1280x720.png",
              "https://placehold.jp/ac43ba/ffffff/1280x720.png",
              "https://placehold.jp/43ba57/ffffff/1280x720.png",
            ],
            url: "https://google.com/",
            id: "steam_19283",
          },
          x: 10,
          y: 10,
        },
      },
      stateHash: "init",
    });
  }, [discussId]);

  return board;
}
