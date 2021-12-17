import classNames from "classnames";
import React, { InputHTMLAttributes } from "react";

import { RHSInputProps } from "../../../types/input";

import styles from "./styles.module.css";

export default function TextInput({
  register,
  label,
  required,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & RHSInputProps) {
  return (
    <input
      {...props}
      {...register(label, { required })}
      type="text"
      className={classNames(styles.textInput, className)}
    />
  );
}
