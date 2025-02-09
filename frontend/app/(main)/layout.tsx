import type React from "react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { CookieBanner } from "@/components/cookieBanner"
import { MetrikaCounter } from 'react-metrika';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <MetrikaCounter id={99630678} />
    </>
  )
}
