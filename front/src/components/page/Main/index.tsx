import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import search, { GameSearchResultItem } from "../../../api/search";
import useDiscussion from "../../../hooks/useDiscussionRTC";
import { debounce } from "throttle-debounce";
import { getGameMetaData } from "../../../api/game";

import SearchPanel from "../../ui/SearchPanel";

import styles from "./styles.module.css";
import GameSuggest from "../../model/discussion/GameSuggest";
import Badge from "../../ui/Badge";
import Board from "../../ui/Board";
import GamePanel from "../../model/discussion/GamePanel";
import Draggable from "react-draggable";

const debouncedSearch = debounce(
  1000,
  (
    searchString: string,
    resolve: (result: GameSearchResultItem[]) => void,
    reject: (error: string) => void
  ) => {
    console.log("検索開始");
    search(searchString)
      .then((result) => {
        console.log("検索完了");
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  }
);

export default function Main() {
  const { discussId } = useParams();

  const discussionBoard = useDiscussion(discussId ?? null);

  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState<GameSearchResultItem[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const onSearchStringChange = (next: string) => {
    console.log("onsearchstringchange");
    setSearchString(next);
    setSearchError(null);
    debouncedSearch(
      next,
      (result) => {
        if (result.length <= 50) {
          setSearchResult(result);
        } else {
          setSearchError("検索結果が多すぎます(>50)");
        }
      },
      () => {
        setSearchError("検索に失敗しました");
      }
    );
  };

  const onSearchResultClicked = (id: string) => async () => {
    const gameMetaData = await getGameMetaData(id);
    discussionBoard.addGameToArena(gameMetaData);
  };

  const onDragged =
    (id: string) =>
    (e: any, { x, y }: { x: number; y: number }) => {
      discussionBoard.moveGame(id, { x, y });
    };

  if (!discussId) {
    return <div>ディスカッションIDが指定されていません</div>;
  }

  if (discussionBoard.error) {
    return <div>接続失敗({discussionBoard.error})</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.leftPane}>
        {discussionBoard.discussion ? (
          <Board className={styles.board}>
            {Object.values(discussionBoard.discussion.item).map((item) => (
              <Draggable
                key={item.game.id}
                position={{ x: item.x, y: item.y }}
                onStop={onDragged(item.game.id)}
              >
                <GamePanel game={item.game} className={styles.gamePanel}>
                  <Badge color="#ff3333">
                    {Object.values(item.approver).filter((b) => b).length}
                  </Badge>
                </GamePanel>
              </Draggable>
            ))}
          </Board>
        ) : (
          `ホワイトボードを読み込んでいます(${discussId})...`
        )}
      </div>
      <div className={styles.rightPane}>
        <SearchPanel value={searchString} onChange={onSearchStringChange}>
          {searchError
            ? searchError
            : searchResult.map((item, index) => {
                /* TODO: SearchPanelSuggestにする */
                return (
                  <GameSuggest
                    key={index}
                    game={item}
                    onClick={onSearchResultClicked(item.appid)}
                  />
                );
              })}
        </SearchPanel>
      </div>
    </div>
  );
}
