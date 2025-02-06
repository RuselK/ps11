"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { SmartCaptcha } from "@yandex/smart-captcha"
import { login } from "@/services/authService"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [captchaToken, setCaptchaToken] = useState("")
  const [resetCaptcha, setResetCaptcha] = useState(0);

  const router = useRouter()

  const handleReset = () => setResetCaptcha((prev) => prev + 1);

  const onTokenExpired = () => {
    setCaptchaToken("")
    handleReset()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (captchaToken === "") {
      setError("Капча не пройдена.")
      return
    }

    try {
      await login({username: email, password: password, token: captchaToken })
      router.push("/dashboard")
    } catch (error) {
      if (error instanceof AxiosError) {
        onTokenExpired()
        if (error.response?.data.detail === "LOGIN_BAD_CREDENTIALS"){
          setError("Неверный email или пароль.")
        } else if (error.response?.data.detail === "Invalid captcha"){
          setError("Ошибка при вводе капчи.")
        } else {
          setError("Ошибка при входе.")
        }
      } else {
        setError("Ошибка при входе.")
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Вход в систему</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-red-500 text-center mt-2 text-sm">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mail@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                </div>
                <Input 
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              <div className="flex justify-center h-100">
                <SmartCaptcha
                  sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_SITEKEY || ""}
                  key={resetCaptcha}
                  onSuccess={setCaptchaToken}
                  onTokenExpired={onTokenExpired}
                  test={true}
                />
              </div>
              <Button type="submit" className="w-full">
                Вход
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Перейти на <Link className="underline" href="/">Главную</Link>
            </div>
            
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
