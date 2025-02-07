import Image from "next/image"

export function Construction() {
  return (
    <section id="construction" className="py-20 bg-background">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Конструкция тест-сепаратора</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/imgs/БЗУ-тест-сепаратор.png"
              alt="Внешний вид БЗУ-тест сепаратора (Тест-сепаратор Полярсервис)"
              width={500}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="md:w-1/2 md:pl-12 p-4">
            <p className="text-lg text-foreground font-bold mb-2">
              Конструктивно установка состоит из технологического блока изготовленного из металлических панелей типа
              «сэндвич», где установлено:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>гидроциклонный сепаратор;</li>
              <li>средства измерения по жидкости, газу с автоматическим пробоотборником;</li>
              <li>технологические трубопроводы с запорной, предохранительной, регулирующей арматурой;</li>
              <li>освещение, вентиляция и обогрев.</li>
              <li>
                Сверху на блоке расположены такелажные узлы, снизу посадочная рама для монтажа и крепления на платформе
                (шасси).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

