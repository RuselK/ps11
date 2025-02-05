import Link from "next/link"
import { Trash2, PenSquare } from "lucide-react"

type Post = {
  id: number
  title: string
  created_at: string
  is_published: boolean
}

type PostListProps = {
  posts: Post[]
  onDeleteClick: (postId: number) => void
}

export default function PostList({ posts, onDeleteClick }: PostListProps) {
  return (
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
                  <p className="mt-1 text-sm text-gray-500">
                    Created on {new Date(post.created_at).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">Status: {post.is_published ? "Published" : "Draft"}</p>
                </div>
              </div>
              <div className="ml-5 flex-shrink-0 flex space-x-2">
                <Link href={`/dashboard/edit-post/${post.id}`} className="text-indigo-600 hover:text-indigo-900">
                  <PenSquare className="h-5 w-5" />
                </Link>
                <button onClick={() => onDeleteClick(post.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

