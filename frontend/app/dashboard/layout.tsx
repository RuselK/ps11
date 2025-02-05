"use client"

import type React from "react"
import Header from "@/components/dashboard/Header"
import { AuthProvider } from "@/lib/AuthContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
      <Header />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </AuthProvider>
  )
}

