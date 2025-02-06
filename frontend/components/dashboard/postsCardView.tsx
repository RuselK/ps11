import Link from "next/link"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeletePostDialog } from "@/components/dashboard/deletePostDialog"
import { PostRead } from "@/services/postService"

interface PostsCardViewProps {
  posts: PostRead[]
  onDelete: (id: number) => void
}

export function PostsCardView({ posts, onDelete }: PostsCardViewProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Статус:</strong> {post.is_published ? "Опубликовано" : "Черновик"}
            </p>
            <p>
              <strong>Дата:</strong> {post.created_at}
            </p>
            <div className="flex space-x-2 mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/posts/${post.id}`}>
                  <Edit className="h-4 w-4 mr-2" /> Редактировать
                </Link>
              </Button>
              <DeletePostDialog onDelete={() => onDelete(post.id)} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

