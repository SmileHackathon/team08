import React, { ReactNode } from "react";

import styles from "./styles.module.css";

export default function Badge({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.badge} style={{ backgroundColor: color }}>
      {children}
    </div>
  );
}
