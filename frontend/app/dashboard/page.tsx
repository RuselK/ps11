"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPostStatistics, PostStatistics } from "@/services/postService"
import { useEffect, useState } from "react"
import { PostsStats } from "@/components/dashboard/postsStats"
import { PostsViews } from "@/components/dashboard/postsViews"
import { MostViewedPosts } from "@/components/dashboard/mostViewedPosts"
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
      <div className="grid gap-4 grid-cols-1">
        <PostsStats statistics={statistics} />
        <PostsViews/>
        <MostViewedPosts/>
      </div>
    </div>
  )
}

