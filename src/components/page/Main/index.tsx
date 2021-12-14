import React from "react";
import Board from "../../ui/Board";
import SearchPanel from "../../ui/SearchPanel";

import styles from "./styles.module.css";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.leftPane}>
        <Board className={styles.board} />
      </div>
      <div className={styles.rightPane}>
        <SearchPanel />
      </div>
    </div>
  );
}
