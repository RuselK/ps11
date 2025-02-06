"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getMostViewedPosts, type MostViewedPostRead } from "@/services/postService"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Users } from "lucide-react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"

export function MostViewedPosts() {
  const [posts, setPosts] = React.useState<MostViewedPostRead[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [limit, setLimit] = React.useState(5)

  React.useEffect(() => {
    setLoading(true)
    getMostViewedPosts(limit)
      .then((res) => {
        setPosts(res.data)
        setError(null)
      })
      .catch((err) => {
        console.error("Failed to fetch most viewed posts:", err)
        setError("Не удалось загрузить данные. Пожалуйста, попробуйте позже.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [limit])

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Самые просматриваемые посты</CardTitle>
        <Select value={String(limit)} onValueChange={(value) => setLimit(parseInt(value))}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Выбрать..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <div className="space-y-2">
            {[...Array(limit)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.post_id}
                className="border-b pb-2 last:border-b-0 last:pb-0"
              >
                <Link
                  href={`/dashboard/posts/${post.post_id}`}
                  className="block hover:bg-muted p-2 rounded-md transition-colors"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium mb-1 break-all">{post.title}</div>
                    <div className="grid grid-cols-1">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.total_views} просмотров
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {post.unique_views} уникальных
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
