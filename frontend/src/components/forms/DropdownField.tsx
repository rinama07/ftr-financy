import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
}

interface DropdownFieldProps<T extends string> {
  disabled?: boolean;
  description?: string;
  id: string;
  label: string;
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function DropdownField<T extends string>({
  disabled = false,
  description,
  id,
  label,
  options,
  value,
  onChange,
}: DropdownFieldProps<T>) {
  return (
    <Field className="w-full h-full">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <Select
        items={options}
        value={value}
        onValueChange={(value) => onChange(value as T)}
        disabled={disabled}
      >
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
