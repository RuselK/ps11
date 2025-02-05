"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import PostList from "@/components/dashboard/PostList"
import Pagination from "@/components/dashboard/Pagination"
import ConfirmationModal from "@/components/ConfirmationModal"

const allPosts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  createdAt: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}))

const POSTS_PER_PAGE = 10

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState(allPosts.slice(0, POSTS_PER_PAGE))
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)

  useEffect(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    setPosts(allPosts.slice(startIndex, endIndex))
  }, [currentPage])

  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)

  const handleDeleteClick = (postId: number) => {
    setPostToDelete(postId)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      // Here you would typically send a delete request to your backend
      console.log(`Deleting post with id: ${postToDelete}`)

      // Update the local state to remove the deleted post
      setPosts(posts.filter((post) => post.id !== postToDelete))

      // Close the modal
      setIsDeleteModalOpen(false)
      setPostToDelete(null)
    }
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
        <Link
          href="/dashboard/new-post"
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          New Post
        </Link>
      </div>
      <PostList posts={posts} onDeleteClick={handleDeleteClick} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  )
}

