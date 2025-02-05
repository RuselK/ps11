import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { getPostBySlug, getAllPosts } from "@/lib/api"
import markdownToHtml from "@/lib/markdownToHtml"

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const content = await markdownToHtml(post.content || "")

  return (
    <>
      <Header />
      <main className="py-20 bg-white">
        <article className="container mx-auto px-6 xl:px-48">
          <h1 className="text-4xl font-bold text-center text-primary mb-8">{post.title}</h1>
          <img
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </main>
      <Footer />
    </>
  )
}

