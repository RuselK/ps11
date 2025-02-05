import Image from "next/image"
import Link from "next/link"

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-6 xl:px-48">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Отзыв нефтяников</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 md:pl-12 p-4">
            <p className="text-lg text-white font-bold mb-6">
              Блочная замерная установка – тест сепаратор «БЗУ-Тест Сепаратор» успешно применялась на месторождениях:
            </p>
            <p className="text-lg text-white mb-6">
              <span className="font-bold">Южно-Ошское месторождение</span> – фонд скважин с высоковязкой и парафинистой
              нефтью с дебитами по жидкости 100-230 м3/сутки;
            </p>
            <p className="text-lg text-white mb-6">
              <span className="font-bold">Мусюшорском месторождении</span> – фонд скважин с легкой нефтью дебитами по
              жидкости 30-50 м3/сутки.
            </p>
          </div>
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/imgs/Нобель-Ойл-о-БЗУ-Тест-сепаратора.jpg"
              alt="Письмо-отзыв о работе БЗУ-Тест Сепаратора в нефтяной отрасли"
              width={400}
              height={600}
              className="rounded-lg shadow-xl h-96 m-auto"
            />
          </div>
        </div>
      </div>
      <div className="pt-20 relative text-center text-white">
        <Link
          href="/media/ТИЗЕР_БЗУ_ ООО_ПС.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition"
        >
          Ознакомиться с документацией
        </Link>
      </div>
    </section>
  )
}

