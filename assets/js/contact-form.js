const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const originalText = sendBtn.innerText;

    sendBtn.disabled = true;
    sendBtn.innerText = "Sending...";

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: contactForm.method,
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => response.json()) 
      .then((data) => {
        if (data.ok) {
          sendBtn.innerText = "Message sent!";
          sendBtn.classList.add("btn-success");
          sendBtn.classList.remove("btn-primary");
          contactForm.reset();
        } else {
          sendBtn.innerText = "Failed to send";
          sendBtn.classList.add("btn-danger");
          sendBtn.classList.remove("btn-primary");
        }

        setTimeout(() => {
          sendBtn.disabled = false;
          sendBtn.innerText = originalText;
          sendBtn.classList.remove("btn-success", "btn-danger");
          sendBtn.classList.add("btn-primary");
        }, 3000);
      })
      .catch(() => {
        sendBtn.innerText = "Failed to send";
        sendBtn.classList.add("btn-danger");
        sendBtn.classList.remove("btn-primary");

        setTimeout(() => {
          sendBtn.disabled = false;
          sendBtn.innerText = originalText;
          sendBtn.classList.remove("btn-danger");
          sendBtn.classList.add("btn-primary");
        }, 3000);
      });
  });
}
