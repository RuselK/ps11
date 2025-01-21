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

 const year = document.getElementById("year")
 const updateYear = () => {
   year.textContent = new Date().getFullYear()
 }


 const phone = document.getElementById("phone")
 const email = document.getElementById("email")

 phone.addEventListener("click", () => {
   phone.textContent = "+7 (903) 200-30-36"
   phone.className = "text-blue-500"
 })

 email.addEventListener("click", () => {
   email.textContent = "info-ps11@mail.ru"
   email.className = "text-blue-500"
 })

 updateYear()
 handleResize()
})