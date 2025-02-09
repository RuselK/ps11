import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PostsCardViewSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-5 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-4" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-28 rounded-sm" />
              <Skeleton className="h-8 w-28 rounded-sm" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
