// import type { Metadata } from "next"
// import { getPublishedPosts } from "@/lib/api/posts"
// import { PostList } from "@/components/post-list"
// import { Pagination } from "@/components/pagination"

// export const metadata: Metadata = {
//   title: "Блог - ООО Полярсервис",
//   description: "Читайте наши последние статьи и новости о нефтегазовой отрасли и нашей продукции",
// }

// export default async function BlogPage({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined }
// }) {
//   const page = typeof searchParams.page === "string" ? Number.parseInt(searchParams.page, 10) : 1
//   const pageSize = 9

//   const { data } = await getPublishedPosts(page, pageSize)

//   return (
//     <main className="container mx-auto px-4 py-16">
//       <h1 className="text-4xl font-bold text-primary mb-8">Наш блог</h1>
//       <p className="text-xl text-muted-foreground mb-12">
//         Последние новости и статьи о нефтегазовой отрасли и нашей продукции
//       </p>
//       <PostList posts={data.items} />
//       <Pagination currentPage={page} totalPages={data.pages || 1} basePath="/blog" />
//     </main>
//   )
// }

