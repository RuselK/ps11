import { Clock, TrendingUp, Users } from "lucide-react"

export default function Advantages() {
  return (
    <section id="advantages" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Наши преимущества</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105">
            <Clock className="text-primary mb-4 w-12 h-12 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-center">Минимальное время на мобилизацию</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Установка находится в Усинском районе п. Парма</li>
              <li>Высокая мобильность за счет малых размеров и веса</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105">
            <TrendingUp className="text-primary mb-4 w-12 h-12 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-center">Невысокие эксплуатационные затраты</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Низкие расходы и ремонтопригодность в полевых условиях</li>
              <li>Оборудование отечественных производителей с проверенной репутацией</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 transition-transform duration-300 hover:scale-105">
            <Users className="text-primary mb-4 w-12 h-12 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-center">Взаимовыгодное сотрудничество</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Простое обслуживание, не требующее специальных навыков</li>
              <li>Аренда установки от 5 тыс. руб в сутки</li>
              <li>Продажа - цена по запросу</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

