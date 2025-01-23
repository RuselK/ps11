document.addEventListener('DOMContentLoaded', () => {
  // Update year
  const year = document.getElementById("year")
  const updateYear = () => {
    year.textContent = new Date().getFullYear()
  }

  updateYear()
})
