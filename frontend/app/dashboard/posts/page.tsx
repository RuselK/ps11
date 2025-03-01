"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostsTable } from "@/components/dashboard/postsTable";
import { PostsCardView } from "@/components/dashboard/postsCardView";
import {
  getPosts,
  deletePost,
  type PaginatedPosts,
} from "@/services/postService";
import { Pagination } from "@/components/blog/pagination";
import { useSearchParams } from "next/navigation";

const POSTS_PER_PAGE = 10;

function PostsPageContent() {
  const searchParams = useSearchParams();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Number.parseInt(pageParam) : 1;

  const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPosts>({
    items: [],
    total: 0,
    page: 1,
    size: POSTS_PER_PAGE,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getPosts(page, POSTS_PER_PAGE);
      setPaginatedPosts(response.data);
    } catch {
      setError("Ошибка при загрузке постов.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      // Re-fetch the current page to update the UI
      fetchPosts(currentPage);
    } catch {
      setError("Ошибка при удалении поста.");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Посты</h1>
        <Button asChild>
          <Link href="/dashboard/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Новый пост
          </Link>
        </Button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Table view on larger screens */}
      <div className="hidden md:block">
        <PostsTable
          posts={paginatedPosts.items}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      {/* Card view on mobile screens */}
      <div className="md:hidden">
        <PostsCardView
          posts={paginatedPosts.items}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={paginatedPosts.pages || 1}
        basePath="/dashboard/posts"
      />
    </div>
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostsPageContent />
    </Suspense>
  );
}
