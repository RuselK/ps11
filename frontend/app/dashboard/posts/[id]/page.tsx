"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/dashboard/tipTapEditor"
import { getPostById, updatePost } from "@/services/postService"
import { toast } from "@/hooks/use-toast"
import { AxiosError } from "axios"

export default function EditPostPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("<p>Загрузка...</p>")
  const [isPublished, setIsPublished] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [postId, setPostId] = useState<number | null>(null)

  // 1. Load the existing post via ID
  useEffect(() => {
    if (!id) return
  
    const numericId = parseInt(id, 10)
    setPostId(numericId)
  
    getPostById(numericId)
      .then((res) => {
        const post = res.data
        setTitle(post.title)
        setContent(post.content)
        setIsPublished(post.is_published)
      })
      .catch((error) => {
        console.error("Error fetching post:", error)
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить пост.",
          variant: "destructive",
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])
  

  // 2. Handle form submission => update post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postId) return

    setIsSubmitting(true)
    try {
      await updatePost(postId, { title, content, is_published: isPublished })
      toast({
        title: "Успешно",
        description: "Пост успешно обновлен",
      })
      router.push("/dashboard/posts")
    } catch (error) {
      console.error("Error updating post:", error)

      if (error instanceof AxiosError) {
        toast({
          title: "Ошибка",
          description:
            error.response?.data.detail ||
            "Не удалось обновить пост. Попробуйте снова.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить пост. Попробуйте снова.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Редактировать пост</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content via TipTap */}
          <div className="space-y-2">
            <Label>Содержание</Label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>

          {/* Publish checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="isPublished">Опубликован</Label>
          </div>

          {/* Submit button */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
