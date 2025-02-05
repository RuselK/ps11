"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Trash2, PenSquare } from "lucide-react"
import ConfirmationModal from "@/components/ConfirmationModal"

const allPosts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Blog Post ${i + 1}`,
  createdAt: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}))

const POSTS_PER_PAGE = 10

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<typeof allPosts>([])
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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                href="/logout"
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
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
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {posts.map((post) => (
                <li key={post.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <Link
                          href={`/dashboard/edit-post/${post.id}`}
                          className="text-lg font-medium text-indigo-600 truncate hover:underline"
                        >
                          {post.title}
                        </Link>
                        <p className="mt-1 text-sm text-gray-500">Created on {post.createdAt}</p>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                      <Link href={`/dashboard/edit-post/${post.id}`} className="text-indigo-600 hover:text-indigo-900">
                        <PenSquare className="h-5 w-5" />
                      </Link>
                      <button onClick={() => handleDeleteClick(post.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Удалить пост"
        message="Вы уверены, что хотите удалить этот пост? Это действие не может быть отменено."
      />
    </div>
  )
}

