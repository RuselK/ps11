import { Hero } from "@/components/landing/hero"
import { About } from "@/components/landing/about"
import { Advantages } from "@/components/landing/advantages"
import { Purpose } from "@/components/landing/purpose"
import { Construction } from "@/components/landing/construction"
import { Documentation } from "@/components/landing/documentation"
import { Reviews } from "@/components/landing/reviews"
import { Contact } from "@/components/landing/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Advantages />
      <Purpose />
      <Construction />
      <Documentation />
      <Reviews />
      <Contact />
    </>
  )
}

