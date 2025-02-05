import "./globals.css"
import type { Metadata } from "next"
import { Roboto, Playfair_Display } from "next/font/google"
import type React from "react"

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
})

const playfair = Playfair_Display({
  weight: ["700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: 'ООО "Полярсервис" - Тест-сепараторы для нефтяной отрасли',
  description:
    "Тест-сепаратор «БЗУ-Тест Сепаратор» от ООО «Полярсервис». Выгодные условия аренды и продажи для оперативного замера дебита нефтяных скважин.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${roboto.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}

