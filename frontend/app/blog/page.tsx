import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getAllPosts } from "@/lib/api"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <Header />
      <main className="py-20 bg-white">
        <div className="container mx-auto px-6 xl:px-48">
          <h1 className="text-4xl font-bold text-center text-primary mb-12">Блог</h1>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <p className="text-sm text-gray-500">{post.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Пока нет доступных постов. Проверьте позже!</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

