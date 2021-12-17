import classNames from "classnames";
import React, { ReactNode, useCallback, useState } from "react";

import styles from "./styles.module.css";

export default function Accordion({
  children,
  text,
  className,
}: {
  children: ReactNode;
  text: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const onClick = useCallback(() => {
    setOpen((b) => !b);
  }, []);
  return (
    <div
      className={classNames(styles.accordion, className, {
        [styles.open]: open,
      })}
    >
      <div className={styles.accordionContent}>{children}</div>
      <div className={styles.accordionButton} onClick={onClick}>
        {text}
      </div>
    </div>
  );
}
