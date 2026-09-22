import clsx from "clsx";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type PrimaryButtonProps = ComponentProps<typeof Button>;

export function PrimaryButton({
  className,
  size,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      variant="default"
      className={clsx(
        "w-full h-auto py-3 px-4",
        {
          "py-2 px-2": size === "sm",
        },
        className,
      )}
      {...props}
    />
  );
}
