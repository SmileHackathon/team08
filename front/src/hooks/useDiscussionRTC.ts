import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Socket } from "socket.io-client";
import { RTC, createRTC } from "../api/rtc";
import { Discussion } from "sugit_types/discussion";
import { GameMetaData } from "sugit_types/game";
import discussionBoardState from "../components/atoms/DiscussionBoardAtom";

/*type DiscussionRTC = {
  isConnected: boolean;
  discussion: Discussion | null;
  error: string | null;
  addGameToArena: (game: GameMetaData) => void;
  moveGame: (gameId: string, pos: { x: number; y: number }) => void;
};*/

export default function useDiscussionRTC(discussId: string | null) {
  const [isConnected, setIsConnected] = useState(false);
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [id, setId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);

  const rtcRef = useRef<RTC | null>(null);

  useEffect(() => {
    setError(null);

    const rtc = createRTC();
    const socket = rtc.socket;

    const onConnectionStateChange = () => {
      setIsConnected(rtc.isConnected());
    };
    socket.on("connect", async () => {
      onConnectionStateChange();
      setId(socket.id);

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
    socket.on(
      "updated",
      ({ discussion_id: received_discussion_id, discussion }) => {
        console.log("updated", received_discussion_id, discussion);
        if (received_discussion_id !== discussId) {
          return;
        }
        setDiscussion(discussion);
      }
    );

    rtcRef.current = rtc;
  }, [discussId]);

  const addGameToArena = (game: GameMetaData) => {
    if (!discussId || !discussion) {
      return;
    }
    rtcRef.current?.updateDiscussion(discussId, {
      action: "addGameToArena",
      game: game,
      x: 640 + (Math.random() - 0.5) * 200,
      y: 360 + (Math.random() - 0.5) * 200,
      baseStateHash: discussion?.stateHash,
      user: rtcRef.current.socket.id, // TODO: なにかしらの永続化ID
    });
  };

  const approveGame = (game_id: string) => {
    if (!discussId || !id || !discussion) {
      return;
    }
    rtcRef.current?.updateDiscussion(discussId, {
      action: "approveGame",
      game_id: game_id,
      user: id,
      baseStateHash: discussion?.stateHash,
    });
  };

  const disApproveGame = (game_id: string) => {
    if (!discussId || !id || !discussion) {
      return;
    }
    rtcRef.current?.updateDiscussion(discussId, {
      action: "disApproveGame",
      game_id: game_id,
      user: id,
      baseStateHash: discussion?.stateHash,
    });
  };

  const moveGame = (gameId: string, { x, y }: { x: number; y: number }) => {
    if (!discussId || !discussion) {
      return;
    }

    rtcRef.current?.updateDiscussion(discussId, {
      action: "moveGame",
      game_id: gameId,
      x: x,
      y: y,
      baseStateHash: discussion?.stateHash,
    });
  };

  return {
    isConnected,
    discussion,
    error,
    addGameToArena,
    moveGame,
    approveGame,
    disApproveGame,
    id,
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
