import Link from "next/link"
import { Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeletePostDialog } from "@/components/dashboard/deletePostDialog"
import { PostRead } from "@/services/postService"
import { PostsTableSkeleton } from "@/components/dashboard/postsTableSkeleton"

interface PostsTableProps {
  posts: PostRead[]
  onDelete: (id: number) => void
  isLoading: boolean
}

export function PostsTable({ posts, onDelete, isLoading }: PostsTableProps) {
  if (isLoading) {
    return <PostsTableSkeleton />
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Заголовок</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Дата</TableHead>
          <TableHead>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.is_published ? "Опубликовано" : "Черновик"}</TableCell>
            <TableCell>{post.created_at}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/posts/${post.slug}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <DeletePostDialog onDelete={() => onDelete(post.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

