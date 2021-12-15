import React, { useEffect, useState } from "react";
import ListItem from "../../../ui/ListItem";
import { GameMetaData } from "sugit_types/game";

import { GameSearchResultItem } from "../../../../api/search";
import { getThumbnail } from "../../../../api/game";

import styles from "./styles.module.css";

export default function GameThumbnail({
  game,
  className,
}: {
  game: GameMetaData | GameSearchResultItem;
  className: string;
}) {
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if ("appid" in game) {
      getThumbnail(game.appid).then(setThumbnail);
    } else {
      setThumbnail(game.thumbnail);
    }
  }, [game]);

  return <img src={thumbnail} alt="" className={className}></img>;
}
