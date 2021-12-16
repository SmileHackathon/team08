import classNames from "classnames";
import React, { useCallback } from "react";

import styles from "./styles.module.css";

export default function CanvasColorButton({
  color,
  onClick,
  className,
  active,
}: {
  color: string;
  onClick: (color: string) => void;
  className?: string;
  active: boolean;
}) {
  const handleClick = useCallback(() => {
    onClick && onClick(color);
  }, [color, onClick]);
  return (
    <button
      onClick={handleClick}
      className={classNames(styles.button, className, {
        [styles.active]: active,
      })}
      style={{ backgroundColor: color }}
    ></button>
  );
}
