import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
        <section className="py-20 bg-background">
          <div className="container mx-auto p-6 xl:px-48">
            <div className="text-center text-foreground mb-12">
              <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
              <h2 className="text-3xl font-bold mb-4">Страница не найдена</h2>
              <p className="text-lg text-muted-foreground">Извините, но запрашиваемая страница не существует.</p>
            </div>
            <div className="relative text-center">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 rounded-full font-bold text-lg">
                <Link href="/">На главную</Link>
              </Button>
            </div>
          </div>
        </section>
    </>
  )
}

