import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{ backgroundImage: "url('/imgs/hero-bg.jpg')" }}
      ></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-900 opacity-40"></div>
      {/* Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Тест-сепаратор для нефтяников
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Блочная замерная установка – тест сепаратор «БЗУ-Тест Сепаратор» предназначена для оперативного измерения продукции нефтегазовых скважин.
        </p>
        <Link
          href="#contact"
          className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition"
        >
          Связаться с нами
        </Link>
      </div>
    </section>
  );
}
