import classNames from "classnames";
import React, { CSSProperties, ReactNode } from "react";

import styles from "./styles.module.css";

export default function Panel({
  children,
  className,
  style,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={classNames(styles.panel, className)} style={style}>
      {children}
    </div>
  );
}
