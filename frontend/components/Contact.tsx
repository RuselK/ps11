"use client";

import axios from "axios";
import { SmartCaptcha } from '@yandex/smart-captcha';
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    name: string;
    email: string;
    phone: string;
    message?: string;
    consent: boolean;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

   const onSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    message?: string;
  }) => {
    setSubmitError("");

    if (!captchaToken) {
      setSubmitError("Пожалуйста, пройдите проверку Captcha");
      return;
    }

    const response = await axios.post("http://127.0.0.1:8000/api/contacts/send_form", {
      ...data,
      captchaToken,
    }, {
      params: {
        token: captchaToken
      }
    }).then(() => {
      setSubmitMessage(
        "Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время."
      );
      reset();
    }).catch(() => {
      setSubmitError(
        "Произошла ошибка при отправке сообщения. Попробуйте еще раз."
      );
    });

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Свяжитесь с нами
        </h2>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Имя<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Это поле обязательно" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Электронная почта<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Это поле обязательно",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Неверный формат email",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 font-semibold mb-2"
              >
                Телефон<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone", { required: "Это поле обязательно" })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">
                  {errors.phone?.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Сообщение
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="consent"
                {...register("consent", {
                  required:
                    "Вы должны согласиться с политикой конфиденциальности",
                })}
                className="mr-2"
              />
              <label htmlFor="consent" className="text-gray-700">
                Согласен с
                <a
                  href="/media/Политика_конфиденциальности_ООО_Полярсервис.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 ml-1"
                >
                  Политикой конфиденциальности
                </a>{" "}
                и даю согласие на обработку персональных данных.
              </label>
            </div>
            {errors.consent && (
              <p className="text-red-500 text-sm">
                {errors.consent?.message?.toString()}
              </p>
            )}
            <SmartCaptcha sitekey="ysc1_kRNU6OrRnrgUowFNkMy00GnWhaEkAHSbIakV5tqvaa6fcfe3" onSuccess={setCaptchaToken} />;
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Отправка..." : "Отправить сообщение"}
            </button>
          </form>
          {/* Success Message */}
          {submitMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
              {submitMessage}
            </div>
          )}
          {/* Submission Error Message */}
          {submitError && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
              {submitError}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
