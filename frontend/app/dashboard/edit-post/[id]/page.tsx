"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import PostForm from "@/components/dashboard/PostForm"

export default function EditPost() {
  const [post, setPost] = useState<{ title: string; content: string; is_published: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const id = params?.id

  useEffect(() => {
    const fetchPost = async () => {
      // Here you would typically fetch the post data from your API
      // For demonstration purposes, we're using mock data
      setIsLoading(true)
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPost({
          title: "Example Post Title",
          content: "<p>This is an example post content.</p>",
          is_published: true,
        })
      } catch (error) {
        console.error("Error fetching post:", error)
        // Here you might want to show an error message to the user
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const handleSubmit = async (data: { title: string; content: string; is_published: boolean }) => {
    // Here you would typically send a PUT request to your API to update the post
    console.log("Updating post:", data)
    // For demonstration purposes, we're just logging the data
    // In a real application, you would send this data to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center py-6">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center py-6 text-red-600">Post not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
        <Link
          href="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Dashboard
        </Link>
      </div>
      <PostForm initialData={post} onSubmit={handleSubmit} submitButtonText="Update Post" />
    </div>
  )
}

