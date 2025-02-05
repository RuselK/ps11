import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function CookieInfo() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 xl:px-48">
            <div className="text-gray-700">
              <h1 className="text-4xl font-bold text-center text-primary mb-12">Информация о сборе «cookie»</h1>
              <p className="mb-4">
                Этот сайт использует сервис веб-аналитики Яндекс Метрика, предоставляемый компанией ООО «ЯНДЕКС»,
                119021, Россия, Москва, ул. Л. Толстого, 16 (далее — Яндекс).
              </p>
              <p className="mb-4">
                Сервис Яндекс Метрика использует технологию «cookie» — небольшие текстовые файлы, размещаемые на
                компьютере пользователей с целью анализа их пользовательской активности.
              </p>
              <p className="mb-4">
                Собранная при помощи cookie информация не может идентифицировать вас, однако может помочь нам улучшить
                работу нашего сайта. Информация об использовании вами данного сайта, собранная при помощи cookie, будет
                передаваться Яндексу и храниться на сервере Яндекса в РФ и/или в ЕЭЗ. Яндекс будет обрабатывать эту
                информацию в интересах владельца сайта, в частности для оценки использования вами сайта, составления
                отчетов об активности на сайте. Яндекс обрабатывает эту информацию в порядке, установленном в Условиях
                использования сервиса Яндекс Метрика.
              </p>
              <p className="mb-4">
                Вы можете отказаться от использования cookies, выбрав соответствующие настройки в браузере. Также вы
                можете использовать инструмент —{" "}
                <a
                  href="https://yandex.ru/support/metrika/general/opt-out.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  https://yandex.ru/support/metrika/general/opt-out.html
                </a>
                . Однако это может повлиять на работу некоторых функций сайта. Используя этот сайт, вы соглашаетесь на
                обработку данных о вас в порядке и целях, указанных выше.
              </p>
            </div>
            <div className="pt-20 relative text-center">
              <Link
                href="/"
                className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition"
              >
                На главную
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

