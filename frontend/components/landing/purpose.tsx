import Image from "next/image"

export function Purpose() {
  return (
    <section id="purpose" className="py-20 bg-background">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Назначение тест-сепаратора</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 md:pr-12 p-4">
            <p className="text-lg text-foreground font-bold mb-2">
              Замер дебита нефтяных скважин – это комплекс работ, который включает в себя:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-4">
              <li>фонтанных и оборудованных глубинным насосным оборудованием (ГНО);</li>
              <li>работающих (циклически) при настройке режима работы ГНО;</li>
              <li>
                в отдаленных районах с получением результатов проб обводненности прямым методом на поточном
                пробоотборнике;
              </li>
              <li>при подготовительных работах к переводу на механизированную добычу;</li>
            </ul>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/imgs/Параметры-БЗУ.jpg"
              alt="Технические параметры БЗУ для замера нефтяных скважин"
              width={500}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

