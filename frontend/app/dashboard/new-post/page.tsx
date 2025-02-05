"use client"

import Link from "next/link"
import PostForm from "@/components/dashboard/PostForm"

export default function NewPost() {
  const handleSubmit = async (data: { title: string; content: string; is_published: boolean }) => {
    // Here you would typically send a POST request to your API to create a new post
    console.log("Creating new post:", data)
    // For demonstration purposes, we're just logging the data
    // In a real application, you would send this data to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call
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

