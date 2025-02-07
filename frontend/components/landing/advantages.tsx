import { Clock, TrendingUp, HandshakeIcon } from "lucide-react"

const advantages = [
  {
    icon: Clock,
    title: "Минимальное время на мобилизацию",
    descriptions: [
      "Установка находится в Усинском районе п. Парма",
      "Высокая мобильность установки за счет малых размеров и веса установки",
    ],
  },
  {
    icon: TrendingUp,
    title: "Невысокие эксплуатационные затраты",
    descriptions: [
      "Невысокие эксплуатационные расходы и ремонтопригодность в полевых условиях за счет использования механических изделий;",
      "Оборудование отечественных производителей с многолетней положительной историей в нефтегазовой отрасли",
    ],
  },
  {
    icon: HandshakeIcon,
    title: "Взаимовыгодное сотрудничество",
    descriptions: [
      "Обслуживание установки не требует специальных навыков и типично для характера работ операторов по добыче нефти нефтяных промыслов.",
      "Аренда установки - от 5 тыс. руб сутки.",
      "Продажа - цена по запросу.",
    ],
  },
]

export function Advantages() {
  return (
    <section id="advantages" className="py-20 bg-muted">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Наши преимущества</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <advantage.icon className="text-secondary mb-4 h-12 w-12" />
              <h3 className="text-2xl font-semibold mb-2">{advantage.title}</h3>
              {advantage.descriptions.map((description, i) => (
                <p key={i} className="text-muted-foreground mb-2">
                  {description}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

