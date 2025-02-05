import { Clock, TrendingUp, Users } from "lucide-react";

export default function Advantages() {
  return (
    <section id="advantages" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Наши преимущества</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Clock className="text-secondary mb-4 w-12 h-12" />
            <h3 className="text-2xl font-semibold mb-2">Минимальное время на мобилизацию</h3>
            <p className="text-gray-600">
              Установка находится в Усинском районе п. Парма
            </p>
            <p className="text-gray-600">
              Высокая мобильность установки за счет малых размеров и веса установки
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <TrendingUp className="text-secondary mb-4 w-12 h-12" />
            <h3 className="text-2xl font-semibold mb-2">Невысокие эксплуатационные затраты</h3>
            <p className="text-gray-600">
              Невысокие эксплуатационные расходы и ремонтопригодность в полевых условиях за счет использования механических изделий;
            </p>
            <p className="text-gray-600">
              Оборудование отечественных производителей с многолетней положительной историей в нефтегазовой отрасли
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users className="text-secondary mb-4 w-12 h-12" />
            <h3 className="text-2xl font-semibold mb-2">Взаимовыгодное сотрудничество</h3>
            <p className="text-gray-600">
              Обслуживание установки не требует специальных навыков и типично для характера работ операторов по добыче нефти нефтяных промыслов.
            </p>
            <p className="text-gray-600">
              Аренда установки - от 5 тыс. руб сутки.
            </p>
            <p className="text-gray-600">
              Продажа - цена по запросу.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
