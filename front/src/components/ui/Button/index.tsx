import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

import styles from "./styles.module.css";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} className={classNames(styles.button, className)} />;
}
