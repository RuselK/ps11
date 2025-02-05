"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { SmartCaptcha } from "@yandex/smart-captcha"
import axios from "axios"

export default function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState("")
  const [captchaToken, setCaptchaToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetCaptcha, setResetCaptcha] = useState(0)

  const handleResetCaptcha = () => {
    setResetCaptcha((prev) => prev + 1)
    setCaptchaToken("")
  }

  const onSubmit = async (data) => {
    setError("")
    setIsSubmitting(true)

    if (!captchaToken) {
      setError("Пожалуйста, пройдите проверку Captcha")
      setIsSubmitting(false)
      return
    }

    const params = new URLSearchParams()
    params.append("username", data.username)
    params.append("password", data.password)
    params.append("grant_type", "password")

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/auth/login?token=${encodeURIComponent(captchaToken)}`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      router.push("/dashboard")
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail)
      } else {
        setError("Ошибка при входе. Пожалуйста, попробуйте снова.")
      }
      handleResetCaptcha()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Вход в систему</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex w-full justify-center">
            <SmartCaptcha
              key={resetCaptcha}
              sitekey="ysc1_kRNU6OrRnrgUowFNkMy00GnWhaEkAHSbIakV5tqvaa6fcfe3"
              onSuccess={(token) => {
                setCaptchaToken(token)
              }}
              onError={handleResetCaptcha}
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50"
            >
              {isSubmitting ? "Вход..." : "Вход"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

