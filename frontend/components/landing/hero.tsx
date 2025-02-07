import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{ backgroundImage: "url('/imgs/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-900 opacity-40" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Тест-сепаратор для нефтяников</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Блочная замерная установка – тест сепаратор «БЗУ-Тест Сепаратор» предназначена для оперативного измерения
          продукции нефтегазовых скважин.
        </p>
        <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 rounded-full font-bold text-lg">
          <Link href="#contact">Связаться с нами</Link>
        </Button>
      </div>
    </section>
  )
}

