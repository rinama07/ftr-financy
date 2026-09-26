import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="gap-3 p-6">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-9 w-48 animate-pulse rounded bg-gray-200" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <Card className="overflow-hidden p-0">
          <div className="h-14 animate-pulse border-b bg-gray-100" />

          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-b px-6 py-4 last:border-b-0"
            >
              <div className="size-10 animate-pulse rounded-lg bg-gray-200" />

              <div className="flex-1 space-y-2">
                <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
              </div>

              <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </Card>

        <Card className="overflow-hidden p-0">
          <div className="h-14 animate-pulse border-b bg-gray-100" />

          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 px-6 py-4">
              <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
              <div className="ml-auto h-4 w-14 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
