"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import PostList from "@/components/dashboard/PostList"
import Pagination from "@/components/dashboard/Pagination"
import ConfirmationModal from "@/components/ConfirmationModal"
import { useAuth } from "@/lib/AuthContext"

export default function Dashboard() {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const router = useRouter()
  const { isAuthenticated, isLoading, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    } else if (isAuthenticated) {
      fetchPosts()
    }
  }, [isLoading, isAuthenticated, router])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/posts/?pageNumber=${currentPage}&pageSize=10`)
      setPosts(response.data.items)
      setTotalPages(response.data.pages)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const handleDeleteClick = (postId: number) => {
    setPostToDelete(postId)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await axios.delete(`/api/posts/${postToDelete}`)
        fetchPosts()
      } catch (error) {
        console.error("Error deleting post:", error)
      }
      setIsDeleteModalOpen(false)
      setPostToDelete(null)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/login")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Posts</h2>
        <div>
          <Link
            href="/dashboard/new-post"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
          >
            New Post
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        </div>
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

