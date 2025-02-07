import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug } from "@/services/postService"
import { CalendarIcon, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { data: post } = await getPostBySlug(params.slug)
    return {
      title: `${post.title} - ООО Полярсервис`,
      description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
    }
  } catch (error) {
    return {
      title: "Статья не найдена - ООО Полярсервис",
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { data: post } = await getPostBySlug(params.slug)

    return (
      <main className="container mx-auto px-4 py-20 xl:px-48">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
              <Link href="/">Главная</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
              <Link href="/blog">Блог</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>{post.title}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    )
  } catch (error) {
    notFound()
  }
}

