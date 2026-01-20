document.addEventListener("includes:loaded", () => {
  const page = document.body.dataset.page;
  if (!page) return;

  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === page);
  });
});
