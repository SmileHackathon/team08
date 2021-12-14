import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Socket } from "socket.io-client";
import { createRTC } from "../api/rtc";
import { Discussion } from "sugit_types/discussion";
import discussionBoardState from "../components/atoms/DiscussionBoardAtom";

type DiscussionRTC = {
  isConnected: boolean;
  discussion: Discussion | null;
  error: string | null;
};

export default function useDiscussionRTC(
  discussId: string | null
): DiscussionRTC {
  const [isConnected, setIsConnected] = useState(false);
  const [discussion, setDiscussion] = useState<Discussion | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    const rtc = createRTC();
    const socket = rtc.socket;

    const onConnectionStateChange = () => {
      setIsConnected(rtc.isConnected());
    };
    socket.on("connect", async () => {
      onConnectionStateChange();

      if (discussId) {
        try {
          await rtc.joinDiscussion(discussId);
          setDiscussion(await rtc.getDiscussion(discussId));
        } catch {
          setError("ディスカッションに接続できませんでした");
          setDiscussion(null);
        }
      }
    });
    socket.on("disconnect", onConnectionStateChange);
    socket.on("connect_error", () => {
      onConnectionStateChange();

      setError("サーバーに接続できませんでした");
    });
  }, [discussId]);

  return {
    isConnected,
    discussion,
    error,
  };
}

/*
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
*/
