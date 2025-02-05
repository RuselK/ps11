"use client"

import { useRouter } from "next/navigation"
import axios from "axios"

export default function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    await axios.post("http://127.0.0.1:8000/api/auth/logout")
    router.push("/login")
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

