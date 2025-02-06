"use client"

import Link from "next/link"
import { Home, FileText, PlusCircle, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { logout } from "@/services/authService"
import { useRouter } from "next/navigation"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const closeSidebar = () => setOpen(false)
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" onClick={closeSidebar}></div>}

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
                className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-gray-900 mb-2"
                onClick={closeSidebar}
              >
                <Home className="mr-4 h-6 w-6" />
                Статистика
              </Link>
              <Link
                href="/dashboard/posts"
                className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-gray-900 mb-2"
                onClick={closeSidebar}
              >
                <FileText className="mr-4 h-6 w-6" />
                Посты
              </Link>
              <Link
                href="/dashboard/posts/new"
                className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-900 hover:bg-gray-50 hover:text-gray-900 mb-2"
                onClick={closeSidebar}
              >
                <PlusCircle className="mr-4 h-6 w-6" />
                Новый пост
              </Link>
            </nav>
          </ScrollArea>
          <div className="border-t border-gray-200 p-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

