import { PostStatistics } from "@/services/postService";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function PostsStats({ statistics }: { statistics: PostStatistics | null }) {

  return (
    <>
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Всего</CardTitle>
        </CardHeader>
          <CardContent>
            {statistics ? (
              <p className="text-2xl md:text-3xl font-bold">{statistics.total_posts}</p>
            ) : (
              <Skeleton className="h-8 md:h-9 w-5" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Опубликовано</CardTitle>
          </CardHeader>
          <CardContent>
            {statistics ? (
              <p className="text-2xl md:text-3xl font-bold">{statistics.total_published_posts}</p>
            ) : (
              <Skeleton className="h-8 md:h-9 w-5" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Черновики</CardTitle>
          </CardHeader>
          <CardContent>
            {statistics ? (
              <p className="text-2xl md:text-3xl font-bold">{statistics.total_draft_posts}</p>
            ) : (
              <Skeleton className="h-8 md:h-9 w-5" />
            )}
        </CardContent>
      </Card>
    </div>
    </>
  )
}

