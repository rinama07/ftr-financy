import clsx from "clsx";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type OutlineButtonProps = ComponentProps<typeof Button>;

export function OutlineButton({ className, ...props }: OutlineButtonProps) {
  return (
    <Button
      variant="outline"
      className={clsx(
        "w-full h-auto text-gray-700 text-base font-medium py-3 px-4",
        className,
      )}
      {...props}
    />
  );
}
