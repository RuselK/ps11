import './style.css'

document.addEventListener('DOMContentLoaded', () => {
 // Mobile menu toggle
 const menuToggle = document.getElementById("menu-toggle")
 const menu = document.getElementById("menu")

 function toggleMenu() {
   menu.classList.toggle("hidden")
 }

 menuToggle.addEventListener("click", toggleMenu)

 // Handle window resize
 function handleResize() {
   if (window.innerWidth >= 768) {
     menu.classList.remove("hidden")
   } else {
     menu.classList.add("hidden")
   }
 }

 window.addEventListener("resize", handleResize)

 const particles = document.getElementById("particles")
 for (let i = 0; i < 50; i++) {
   const particle = document.createElement("div")
   particle.classList.add("absolute", "bg-white", "rounded-full", "opacity-50")
   particle.style.width = `${Math.random() * 5 + 1}px`
   particle.style.height = particle.style.width
   particle.style.left = `${Math.random() * 100}%`
   particle.style.top = `${Math.random() * 100}%`
   particles.appendChild(particle)
 }

 const year = document.getElementById("year")
 const updateYear = () => {
   year.textContent = new Date().getFullYear()
 }

 
 updateYear()
 handleResize()
})