import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

type DashboardSummaryCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName: string;
};

export function DashboardSummaryCard({
  label,
  value,
  icon: Icon,
  iconClassName,
}: DashboardSummaryCardProps) {
  return (
    <Card className="gap-3 p-6">
      <div className="flex items-center gap-2">
        <Icon className={clsx("size-5", iconClassName)} />

        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {label}
        </span>
      </div>

      <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        {value}
      </p>
    </Card>
  );
}
