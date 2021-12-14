import React from "react";
import { Discussion } from "sugit_types/discussion";
import Board from "../../../ui/Board";
import GamePanel from "../GamePanel";

// import styles from "./styles.module.css";

export default function DiscussionBoard({
  discussion,
  className,
}: {
  discussion: Discussion;
  className?: string;
}) {
  return (
    <Board className={className}>
      {Object.values(discussion.item).map((item) => (
        <GamePanel key={item.game.id} game={item.game} />
      ))}
    </Board>
  );
}
