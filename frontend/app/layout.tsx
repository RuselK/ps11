import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ООО Полярсервис - Замеры дебита нефтяных скважин",
  description:
    "Тест-сепаратор «БЗУ-Тест Сепаратор» от ООО «Полярсервис». Выгодные условия аренды и продажи для оперативного замера дебита нефтяных скважин. Минимальное время мобилизации и низкие эксплуатационные затраты.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

