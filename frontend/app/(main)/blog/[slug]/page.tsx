import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/services/postService";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PostViewTracker from "@/components/blog/collectView";

// Update the type to reflect that params is asynchronous
interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params: _params,
}: BlogPostPageProps): Promise<Metadata> {
  // Await the params before accessing its properties
  const { slug } = await _params;

  try {
    const { data: post } = await getPostBySlug(slug);
    return {
      title: `${post.title} - ООО Полярсервис`,
      description: post.content.replace(/<[^>]*>/g, "").substring(0, 160),
    };
  } catch (error) {
    return {
      title: "Статья не найдена - ООО Полярсервис",
    };
  }
}

export default async function BlogPostPage({
  params: _params,
}: BlogPostPageProps) {
  // Await the params before using them
  const { slug } = await _params;

  try {
    const { data: post } = await getPostBySlug(slug);

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
          <h1 className="text-4xl font-bold text-primary mb-4 break-words">{post.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        {/* Pass the awaited slug to your client component */}
        <PostViewTracker slug={slug} />
      </main>
    );
  } catch (error) {
    notFound();
  }
}
