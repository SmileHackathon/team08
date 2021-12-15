import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import search, { GameSearchResultItem } from "../../../api/search";
import useDiscussion from "../../../hooks/useDiscussionRTC";
import { debounce } from "throttle-debounce";
import { getGameMetaData } from "../../../api/game";

import DiscussionBoard from "../../model/discussion/DiscussionBoard";
import SearchPanel from "../../ui/SearchPanel";

import styles from "./styles.module.css";
import ListItem from "../../ui/ListItem";
import GameThumbnail from "../../model/discussion/GameThumbnail";
import GameSuggest from "../../model/discussion/GameSuggest";

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

  const [searchString, setSearchString] = useState("");
  const [searchResult, setSearchResult] = useState<GameSearchResultItem[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  const discussionBoard = useDiscussion(discussId ?? null);

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
          <DiscussionBoard
            discussion={discussionBoard.discussion}
            className={styles.board}
          />
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
