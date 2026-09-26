import clsx from "clsx";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type LinkButtonProps = ComponentProps<typeof Button>;

export function LinkButton({ className, ...props }: LinkButtonProps) {
  return (
    <Button variant="link" className={clsx("p-0 m-0", className)} {...props} />
  );
}
