import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-primary to-blue-600">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Инновационные тест-сепараторы для нефтяной промышленности
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Блочная замерная установка «БЗУ-Тест Сепаратор» - передовое решение для оперативного измерения продукции
          нефтегазовых скважин.
        </p>
        <Link
          href="#contact"
          className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition shadow-lg"
        >
          Связаться с нами
        </Link>
      </div>
    </section>
  )
}

