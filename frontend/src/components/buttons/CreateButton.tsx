import { Plus } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { PrimaryButton } from "./PrimaryButton";

type CreateButtonProps = ComponentProps<typeof Button> & {
  label: string;
};

export function CreateButton({ label, ...props }: CreateButtonProps) {
  return (
    <PrimaryButton type="button" size="sm" className="w-auto" {...props}>
      <Plus />
      <span>{label}</span>
    </PrimaryButton>
  );
}
