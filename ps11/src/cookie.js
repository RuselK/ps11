document.addEventListener('DOMContentLoaded', () => {
  // Cookie banner
  const cookieBanner = document.getElementById("cookie-banner");
  const cookieAcceptBtn = document.getElementById("cookie-accept");
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    cookieBanner.classList.remove("hidden");
  }

  cookieAcceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    cookieBanner.classList.add("hidden");
  });
})