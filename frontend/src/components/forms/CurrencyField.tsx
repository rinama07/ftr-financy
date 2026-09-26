import { TextField, type TextFieldProps } from "./TextField";

export function CurrencyField({ ...props }: TextFieldProps) {
  return (
    <TextField {...props} inputMode="decimal" placeholder="0,00" addon="R$" />
  );
}
