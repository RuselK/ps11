import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Advantages from "@/components/Advantages"
import Purpose from "@/components/Purpose"
import Construction from "@/components/Construction"
import Documentation from "@/components/Documentation"
import Reviews from "@/components/Reviews"
import Contact from "@/components/Contact"
import CookieBanner from "@/components/CookieBanner"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Advantages />
        <Purpose />
        <Construction />
        <Documentation />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}

