import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  // Form submission and popover
  const contactForm = document.getElementById("contact-form")
  const closePopover = document.getElementById("close-popover")
  const popover = document.getElementById("popover")
  const popoverMessage = document.getElementById("popover-message")
  
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const captchaToken = document.querySelector("#captcha-container").querySelector("input[name='smart-token']");
    if (!captchaToken.value) {
      popoverMessage.textContent = "Пожалуйста, проверьте, что вы не робот.";
      popover.classList.remove("hidden");
      return;
    }
    axios.post("/api/send_form", {
      name: contactForm.name.value,
      phone: contactForm.phone.value,
      email: contactForm.email.value,
      message: contactForm.message.value,
    }, {
      params: {
        token: captchaToken.value
      }
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(() => {
      popoverMessage.textContent = "Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время."
      popover.classList.remove("hidden")
      contactForm.reset()
    })
    .catch((error) => {
      console.error("Error sending form data:", error)
      popoverMessage.textContent = "Произошла ошибка при отправке сообщения. Попробуйте еще раз."
      popover.classList.remove("hidden")
    })
  })

  closePopover.addEventListener("click", () => {
    popover.classList.add("hidden")
  })

  // Close popover when clicking outside
  popover.addEventListener("click", (e) => {
    if (e.target === popover) {
      popover.classList.add("hidden")
    }
  })
})