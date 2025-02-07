import Link from "next/link"
import type { PostRead } from "@/lib/api/posts"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

interface PostListProps {
  posts: PostRead[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <Link href={`/blog/${post.slug}`}>
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-primary">{post.title}</CardTitle>
              <CardDescription className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {new Date(post.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="text-foreground line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
                }}
              />
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}

