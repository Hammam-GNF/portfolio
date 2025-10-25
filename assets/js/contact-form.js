/**
 * Contact Form (Formspree) AJAX handling
 */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const loading = contactForm.querySelector(".loading");
  const errorMsg = contactForm.querySelector(".error-message");
  const sentMsg = contactForm.querySelector(".sent-message");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    loading.style.display = "block";
    errorMsg.style.display = "none";
    sentMsg.style.display = "none";

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: contactForm.method,
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        loading.style.display = "none";
        if (data.ok || data.success) {
          sentMsg.style.display = "block";
          contactForm.reset();
        } else {
          errorMsg.style.display = "block";
          errorMsg.innerText = "Failed to send message. Please try again.";
        }
      })
      .catch(() => {
        loading.style.display = "none";
        errorMsg.style.display = "block";
        errorMsg.innerText = "Failed to send message. Please try again.";
      });
  });
}
