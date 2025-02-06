"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostsTable } from "@/components/dashboard/postsTable"
import { PostsCardView } from "@/components/dashboard/postsCardView"
import { getPosts, PostRead, deletePost, PaginatedPosts } from "@/services/postService"
import { Pagination } from "@/components/ui/pagination"

const POSTS_PER_PAGE = 10

export default function PostsPage() {
  const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPosts>({
    items: [],
    total: 0,
    page: 1,
    size: POSTS_PER_PAGE,
    pages: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async (page = 1) => {
    setIsLoading(true)
    try {
      const response = await getPosts(page, POSTS_PER_PAGE)
      setPaginatedPosts(response.data)
    } catch (error) {
      setError("Ошибка при загрузке постов.")
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    
    fetchPosts()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id)
      setPaginatedPosts({
        ...paginatedPosts,
        items: paginatedPosts.items.filter((post) => post.id !== id),
      })
    } catch (error) {
      setError("Ошибка при удалении поста.")
    }
  }
  
  const handlePageChange = (page: number) => {
    fetchPosts(page)
  }

  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Посты</h1>
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Новый пост
          </Link>
        </Button>
      </div>
      <div className="hidden md:block">
        <PostsTable posts={paginatedPosts.items} onDelete={handleDelete} isLoading={isLoading} />
      </div>
      <div className="md:hidden">
        <PostsCardView posts={paginatedPosts.items} onDelete={handleDelete} />
      </div>
      {paginatedPosts.pages && paginatedPosts.pages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={paginatedPosts.page || 1}
            totalPages={paginatedPosts.pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

