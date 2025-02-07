"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CookieBanner() {
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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-background text-foreground px-4 py-3 mx-4 rounded-md shadow-md max-w-md w-full z-50">
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <p className="flex-1 mr-4 mb-2 md:mb-0">
          Мы используем cookie. Продолжая пользоваться сайтом, вы соглашаетесь на использование cookie.
          <Link href="/cookie_info" className="underline ml-1">
            Подробнее
          </Link>
        </p>
        <Button onClick={handleAccept} className="bg-secondary hover:bg-secondary/90 font-bold">
          Понятно
        </Button>
      </div>
    </div>
  )
}

