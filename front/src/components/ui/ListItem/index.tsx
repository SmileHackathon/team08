import React, { ReactNode } from "react";

import styles from "./styles.module.css";

export default function ListItem({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => any;
}) {
  return (
    <div className={styles.suggest} onClick={onClick}>
      {children}
    </div>
  );
}
