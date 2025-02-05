import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto p-6 xl:px-48">
            <div className="text-center text-gray-700 mb-12">
              <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
              <h2 className="text-3xl font-bold mb-4">Страница не найдена</h2>
              <p className="text-lg text-gray-600">Извините, но запрашиваемая страница не существует.</p>
            </div>
            <div className="relative text-center">
              <Link
                href="/"
                className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-opacity-90 transition focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
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

