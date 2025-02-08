"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { SmartCaptcha } from "@yandex/smart-captcha"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Import the contact form service
import { sendContactForm } from "@/services/formService"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно быть заполнено",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  phone: z.string().min(5, {
    message: "Номер телефона должен быть заполнен",
  }),
  message: z.string().optional(),
  consent: z
    .boolean()
    .refine((val: boolean) => val === true, {
      message: "Вы должны согласиться с политикой конфиденциальности",
    }),
})

export function Contact() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")

  // Captcha-related state
  const [captchaToken, setCaptchaToken] = useState("")
  const [resetCaptcha, setResetCaptcha] = useState(0)

  const handleResetCaptcha = () => setResetCaptcha((prev: number) => prev + 1)

  const onTokenExpired = () => {
    setCaptchaToken("")
    handleResetCaptcha()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!captchaToken) {
      setDialogMessage("Пожалуйста, проверьте, что вы не робот.")
      setIsDialogOpen(true)
      return
    }

    try {
      await sendContactForm(values, captchaToken)

      setDialogMessage("Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.")
      setIsDialogOpen(true)
      form.reset()
      onTokenExpired()
    } catch (error) {
      console.error("Error sending form data:", error)
      setDialogMessage("Произошла ошибка при отправке сообщения. Попробуйте еще раз.")
      setIsDialogOpen(true)

      onTokenExpired()
    }
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Свяжитесь с нами
        </h2>
        <div className="max-w-lg mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Имя<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Ваше имя" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Электронная почта<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="example@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Телефон<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+7 (999) 999-99-99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сообщение</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ваше сообщение" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Согласен с{" "}
                        <a
                          href="/media/Политика_конфиденциальности_ООО_Полярсервис.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Политикой конфиденциальности
                        </a>{" "}
                        и даю согласие на обработку персональных данных.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <div className="w-full">
                <SmartCaptcha
                  sitekey={process.env.NEXT_PUBLIC_SMARTCAPTCHA_SITEKEY || ""}
                  key={resetCaptcha}
                  onSuccess={setCaptchaToken}
                  onTokenExpired={onTokenExpired}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 font-bold text-white"
              >
                Отправить сообщение
              </Button>
            </form>
          </Form>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Статус отправки</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => setIsDialogOpen(false)}
            className="bg-secondary hover:bg-secondary/90 rounded-full text-white"
          >
            Закрыть
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  )
}
