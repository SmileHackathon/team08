import classNames from "classnames";
import React, { useCallback } from "react";

import styles from "./styles.module.css";

export default function CanvasEraserButton({
  onClick,
  className,
  active,
}: {
  onClick: () => void;
  className?: string;
  active: boolean;
}) {
  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);
  return (
    <button
      onClick={handleClick}
      className={classNames(styles.button, className, {
        [styles.active]: active,
      })}
    ></button>
  );
}
