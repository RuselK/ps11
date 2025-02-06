"use client"

import Link from "next/link"
import { Home, FileText, PlusCircle, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { logout } from "@/services/authService"
import { useRouter, usePathname } from "next/navigation" // import usePathname
import { cn } from "@/lib/utils" // optional helper for conditional classes

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const closeSidebar = () => setOpen(false)
  const router = useRouter()
  
  // The current route (e.g., "/dashboard/posts" or "/dashboard")
  const pathname = usePathname()
  
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Helper to determine if a link is active
  // For exact match: pathname === href
  // For nested routes: e.g. if you want "/dashboard/posts/new" to highlight "/dashboard/posts":
  //     => pathname.startsWith(href)
  function isActive(href: string) {
    return pathname === href
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-2xl font-bold">ps11-AdminPanel</h1>
            <Button variant="ghost" size="icon" onClick={closeSidebar} className="md:hidden">
              <X className="h-6 w-6" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <nav className="mt-5 px-2">
              <Link
                href="/dashboard"
                onClick={closeSidebar}
                className={cn(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 mb-2",
                  {
                    // Apply active styles if the path is exactly '/dashboard'
                    "bg-gray-200  hover:bg-gray-300 font-semibold":
                      isActive("/dashboard"),
                  }
                )}
              >
                <Home className="mr-4 h-6 w-6" />
                Статистика
              </Link>
              <Link
                href="/dashboard/posts"
                onClick={closeSidebar}
                className={cn(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 mb-2",
                  {
                    // If you want sub-routes (e.g. "/dashboard/posts/new") to highlight the same link,
                    // you could do pathname.startsWith("/dashboard/posts") here.
                    "bg-gray-200  hover:bg-gray-300 font-semibold":
                      isActive("/dashboard/posts"),
                  }
                )}
              >
                <FileText className="mr-4 h-6 w-6" />
                Посты
              </Link>
              <Link
                href="/dashboard/posts/new"
                onClick={closeSidebar}
                className={cn(
                  "group flex items-center px-2 py-2 text-base font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 mb-2",
                  {
                    "bg-gray-200  hover:bg-gray-300 font-semibold":
                      isActive("/dashboard/posts/new"),
                  }
                )}
              >
                <PlusCircle className="mr-4 h-6 w-6" />
                Новый пост
              </Link>
            </nav>
          </ScrollArea>
          <div className="border-t border-gray-200 p-4">
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
