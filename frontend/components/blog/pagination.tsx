import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button variant="outline" size="icon" disabled={currentPage <= 1}>
        {currentPage > 1 ? (
          <Link href={`${basePath}?page=${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Предыдущая страница</span>
          </Link>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Предыдущая страница</span>
          </>
        )}
      </Button>

      <span className="text-sm text-muted-foreground">
        Страница {currentPage} из {totalPages}
      </span>

      <Button variant="outline" size="icon" disabled={currentPage >= totalPages}>
        {currentPage < totalPages ? (
          <Link href={`${basePath}?page=${currentPage + 1}`}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Следующая страница</span>
          </Link>
        ) : (
          <>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Следующая страница</span>
          </>
        )}
      </Button>
    </div>
  )
}
