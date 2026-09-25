import { TextField, type TextFieldProps } from "./TextField";

export function DateField({ ...props }: TextFieldProps) {
  return <TextField {...props} type="date" />;
}
