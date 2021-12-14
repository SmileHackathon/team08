import React, { ReactNode } from "react";

import styles from "./styles.module.css";

export default function SearchPanelSuggest({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.suggest}>{children}</div>;
}
