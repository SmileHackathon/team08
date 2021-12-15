import React from "react";
import { Discussion } from "sugit_types/discussion";
import Badge from "../../../ui/Badge";
import Board from "../../../ui/Board";
import GamePanel from "../GamePanel";

import styles from "./styles.module.css";

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
        <GamePanel
          key={item.game.id}
          game={item.game}
          className={styles.gamePanel}
          style={{
            left: `${item.x * 100}%`,
            top: `${item.y * 100}%`,
          }}
        >
          <Badge color="#ff3333">
            {Object.values(item.approver).filter((b) => b).length}
          </Badge>
        </GamePanel>
      ))}
    </Board>
  );
}
