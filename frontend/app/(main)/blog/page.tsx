import type { Metadata } from "next";
import { getPublishedPosts } from "@/services/postService";
import { PostList } from "@/components/blog/postList";
import { Pagination } from "@/components/blog/pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Блог - ООО Полярсервис",
  description:
    "Читайте наши последние статьи и новости о нефтегазовой отрасли и нашей продукции",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page =
    typeof params.page === "string"
      ? Number.parseInt(params.page, 10)
      : 1;

  const pageSize = 9;
  const { data } = await getPublishedPosts(page, pageSize);

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
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold text-primary mb-16">Наш блог</h1>
      <PostList posts={data.items} />
      <Pagination
        currentPage={page}
        totalPages={data.pages || 1}
        basePath="/blog"
      />
    </main>
  );
}
