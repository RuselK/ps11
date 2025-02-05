"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
                    bg-gray-100 text-gray-800 px-4 py-3 mx-4 rounded-md shadow-md 
                    max-w-md w-full z-50"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <p className="flex-1 mr-4">
          Мы используем cookie. Продолжая пользоваться сайтом, вы соглашаетесь на использование cookie.
          <Link href="/cookie_info" className="underline ml-1">
            Подробнее
          </Link>
        </p>
        <button
          onClick={handleAccept}
          className="mt-2 md:mt-0 bg-primary text-white px-4 py-2 
                      rounded hover:bg-opacity-90 transition"
        >
          Понятно
        </button>
      </div>
    </div>
  )
}

