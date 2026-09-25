import { Card } from "@/components/ui/card";

export function TransactionTableSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        <div className="h-14 border-b bg-gray-50" />

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex min-w-230 items-center gap-6 border-b p-6 last:border-b-0"
          >
            <div className="size-10 rounded-lg bg-gray-200" />
            <div className="h-4 w-56 rounded bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-6 w-28 rounded-full bg-gray-200" />
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="ml-auto h-4 w-28 rounded bg-gray-200" />
            <div className="h-8 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </Card>
  );
}
