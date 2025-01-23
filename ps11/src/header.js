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

  handleResize()
})