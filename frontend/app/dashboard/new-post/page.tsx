"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import PostForm from "@/components/dashboard/PostForm"
import { useAuth } from "@/lib/AuthContext"
import { useEffect } from "react"

export default function NewPost() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  const handleSubmit = async (data: { title: string; content: string; is_published: boolean }) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/posts/", data)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error creating post:", error)
      // Here you might want to show an error message to the user
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null // This will be handled by the useEffect hook
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Dashboard
        </Link>
      </div>
      <PostForm onSubmit={handleSubmit} submitButtonText="Create Post" />
    </div>
  )
}

