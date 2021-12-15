import React, { useCallback } from "react";
import { GameSearchResultItem } from "../../../../api/search";
import ListItem from "../../../ui/ListItem";
import GameThumbnail from "../GameThumbnail";

import styles from "./styles.module.css";

export default function GameSuggest({
  game,
  onClick,
}: {
  game: GameSearchResultItem;
  onClick?: (appId: string) => any;
}) {
  const handleClick = useCallback(() => {
    onClick && onClick(game.appid);
  }, [game, onClick]);

  return (
    <div onClick={handleClick} className={styles.suggest}>
      <div className={styles.name}>{game.name}</div>
      <GameThumbnail game={game} className={styles.thumbnail} />
    </div>
  );
}
