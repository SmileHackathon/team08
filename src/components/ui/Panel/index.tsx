import classNames from "classnames";
import React, { ReactNode } from "react";

import styles from "./styles.module.css";

export default function Panel({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return <div className={classNames(styles.panel, className)}>{children}</div>;
}
