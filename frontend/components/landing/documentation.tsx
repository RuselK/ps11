import Image from "next/image"

const documents = [
  {
    image: "/imgs/Декларация-ЕАЭС_-БЗУ-Тест-сепаратора-1160x1536.jpg",
    title: "Декларация о соответствии № ЕАЭС N RU Д-RU.РА03.В.46045/23",
    alt: "Декларация о соответствии ЕАЭС для БЗУ-Тест Сепаратора",
  },
  {
    image: "/imgs/Сертификат-ЕАЭС_на-тип-БЗУ-Тест-сепаратора-1-1159x1536.jpg",
    title: "Сертификат на тип продукции № ЕАЭС RU СТ-RU.НВ54.00632",
    alt: "Сертификат на тип продукции ЕАЭС для БЗУ-Тест Сепаратора",
  },
  {
    image: "/imgs/ТУ-на-Тест-сепаратор-БЗУ-1-1118x1536.jpg",
    title: "ТУ 28.99.39-001-81875430-2023 «Блочные замерные установки-тест сепараторы (БЗУ-тест сепараторы)»",
    alt: "ТУ на Тест-сепаратор БЗУ (ТУ 28.99.39-001-81875430-2023)",
  },
]

export function Documentation() {
  return (
    <section id="documentation" className="py-20 bg-muted">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Разрешительная документация</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="bg-background rounded-lg shadow-md p-6 cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <Image
                src={doc.image || "/placeholder.svg"}
                alt={doc.alt}
                width={300}
                height={400}
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-center mb-4">{doc.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

