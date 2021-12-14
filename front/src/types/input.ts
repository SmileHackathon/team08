import { UseFormRegister } from "react-hook-form";

export type RHSInputProps = {
  register: UseFormRegister<any>;
  required?: boolean;
  label: string;
};
