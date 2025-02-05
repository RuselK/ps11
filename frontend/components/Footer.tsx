"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 text-center text-sm">
        <nav className="mb-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link
                href="/media/Политика_конфиденциальности_ООО_Полярсервис.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition"
              >
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link href="/cookie_info" className="text-gray-300 hover:text-secondary transition">
                Информация о сборе «cookie»
              </Link>
            </li>
            <li>
              <Link
                href="/media/Карточка_ООО_Полярсервис.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition"
              >
                Карточка контрагента
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-gray-400">&copy; {year} Все права защищены.</p>
        <p className="text-gray-400">ООО "Полярсервис" ОГРН: 1237700225531</p>
      </div>
    </footer>
  )
}

