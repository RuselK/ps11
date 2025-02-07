"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navItems = [
  { href: "/#about", label: "Преимущества" },
  { href: "/#purpose", label: "Назначение" },
  { href: "/#construction", label: "Конструкция" },
  { href: "/#documentation", label: "Документация" },
  { href: "/#reviews", label: "Отзыв" },
  { href: "/#contact", label: "Контакты" },
  { href: "/blog", label: "Блог" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed w-full bg-background shadow-md z-50">
      <nav className="container mx-auto px-6 py-3 xl:px-48">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-primary">
            ПОЛЯРСЕРВИС
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground hover:text-secondary transition">
                {item.label}
              </Link>
            ))}
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-2xl font-bold mb-4">Навигация</SheetTitle>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-secondary transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

