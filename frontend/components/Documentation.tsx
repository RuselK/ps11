import Image from "next/image"

export default function Documentation() {
  return (
    <section id="documentation" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-primary mb-12">Разрешительная документация</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="service-card bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition duration-300 hover:scale-105">
            <Image
              src="/imgs/Декларация-ЕАЭС_-БЗУ-Тест-сепаратора-1160x1536.jpg"
              alt="Декларация о соответствии ЕАЭС для БЗУ-Тест Сепаратора"
              width={300}
              height={400}
              className="mx-auto mb-4"
            />
            <h3 className="text-1xl font-semibold text-center mb-4">
              Декларация о соответствии № ЕАЭС N RU Д-RU.РА03.В.46045/23
            </h3>
          </div>
          <div className="service-card bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition duration-300 hover:scale-105">
            <Image
              src="/imgs/Сертификат-ЕАЭС_на-тип-БЗУ-Тест-сепаратора-1-1159x1536.jpg"
              alt="Сертификат на тип продукции ЕАЭС для БЗУ-Тест Сепаратора"
              width={300}
              height={400}
              className="mx-auto mb-4"
            />
            <h3 className="text-1xl font-semibold text-center mb-4">
              Сертификат на тип продукции № ЕАЭС RU СТ-RU.НВ54.00632
            </h3>
          </div>
          <div className="service-card bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition duration-300 hover:scale-105">
            <Image
              src="/imgs/ТУ-на-Тест-сепаратор-БЗУ-1-1118x1536.jpg"
              alt="ТУ на Тест-сепаратор БЗУ (ТУ 28.99.39-001-81875430-2023)"
              width={300}
              height={400}
              className="mx-auto mb-4"
            />
            <h3 className="text-1xl font-semibold text-center mb-4">
              ТУ 28.99.39-001-81875430-2023 «Блочные замерные установки-тест сепараторы (БЗУ-тест сепараторы)»
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

