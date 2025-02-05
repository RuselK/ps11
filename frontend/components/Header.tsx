"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            ПОЛЯРСЕРВИС
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="#about" className="text-foreground hover:text-primary transition">
              Преимущества
            </Link>
            <Link href="#purpose" className="text-foreground hover:text-primary transition">
              Назначение
            </Link>
            <Link href="#construction" className="text-foreground hover:text-primary transition">
              Конструкция
            </Link>
            <Link href="#documentation" className="text-foreground hover:text-primary transition">
              Документация
            </Link>
            <Link href="#reviews" className="text-foreground hover:text-primary transition">
              Отзывы
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition">
              Контакты
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition">
              Блог
            </Link>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="#about" className="block text-foreground hover:text-primary transition">
              Преимущества
            </Link>
            <Link href="#purpose" className="block text-foreground hover:text-primary transition">
              Назначение
            </Link>
            <Link href="#construction" className="block text-foreground hover:text-primary transition">
              Конструкция
            </Link>
            <Link href="#documentation" className="block text-foreground hover:text-primary transition">
              Документация
            </Link>
            <Link href="#reviews" className="block text-foreground hover:text-primary transition">
              Отзывы
            </Link>
            <Link href="#contact" className="block text-foreground hover:text-primary transition">
              Контакты
            </Link>
            <Link href="/blog" className="block text-foreground hover:text-primary transition">
              Блог
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

