import { Card } from "@/components/ui/card";

export function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="h-56 animate-pulse p-6">
          <div className="flex justify-between">
            <div className="size-10 rounded-lg bg-gray-200" />

            <div className="flex gap-2">
              <div className="size-8 rounded-md bg-gray-200" />
              <div className="size-8 rounded-md bg-gray-200" />
            </div>
          </div>

          <div className="mt-6 h-5 w-32 rounded bg-gray-200" />
          <div className="mt-2 h-10 w-full rounded bg-gray-200" />
        </Card>
      ))}
    </div>
  );
}
