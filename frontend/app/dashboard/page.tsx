"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostStatistics, PostStatistics } from "@/services/postService"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  const [statistics, setStatistics] = useState<PostStatistics | null>(null)

  useEffect(() => {
    getPostStatistics().then((response) => {
      setStatistics(response.data)
    })
  }, [])

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Обзор</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Всего постов</CardTitle>
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
            <CardTitle>Опубликовано постов</CardTitle>
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
    </div>
  )
}

