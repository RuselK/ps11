import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "next-themes"
import React from 'react';
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { CookieBanner } from "@/components/cookieBanner";

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ООО Полярсервис - Замеры дебита нефтяных скважин",
  description: "Тест-сепаратор «БЗУ-Тест Сепаратор» от ООО «Полярсервис». Выгодные условия аренды и продажи для оперативного замера дебита нефтяных скважин. Минимальное время мобилизации и низкие эксплуатационные затраты.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
        >
          <Header />
          <main>
            {children}
          </main>
          <CookieBanner />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

