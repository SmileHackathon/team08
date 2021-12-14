import React from "react";
import { useParams } from "react-router";
import useDiscussion from "../../../hooks/useDiscussionRTC";

import DiscussionBoard from "../../model/discussion/DiscussionBoard";
import SearchPanel from "../../ui/SearchPanel";

import styles from "./styles.module.css";

export default function Main() {
  const { discussId } = useParams();

  if (!discussId) {
    return <div>ディスカッションIDが指定されていません</div>;
  }

  const discussionBoard = useDiscussion(discussId);

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
        <SearchPanel />
      </div>
    </div>
  );
}
