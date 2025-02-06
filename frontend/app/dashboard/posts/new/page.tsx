"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TiptapEditor } from "@/components/dashboard/tipTapEditor"
import { createPost } from "@/services/postService"
import { toast } from "@/hooks/use-toast"
import { AxiosError } from "axios"

export default function NewPostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("<p>Start writing your post here...</p>")
  const [isPublished, setIsPublished] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await createPost({ title, content, is_published: isPublished })
      toast({
        title: "Успешно",
        description: "Пост успешно создан",
      })
      router.push("/dashboard/posts")
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error creating post:", error)
        if (error.response?.data.detail === "Post with this title already exists") {
          toast({
            title: "Ошибка",
            description: "Пост с таким названием уже существует",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Ошибка",
            description: "Не удалось создать пост. Пожалуйста, попробуйте снова.",
            variant: "destructive",
          })
        }

      } else {
        console.error("Error creating post:", error)
        toast({
          title: "Ошибка",
          description: "Не удалось создать пост. Пожалуйста, попробуйте снова.",
          variant: "destructive",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Создать новый пост</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Содержание</Label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="isPublished">Опубликовать сразу</Label>
          </div>
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Создание..." : "Создать пост"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

