const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

const project = window.PORTFOLIOS?.[slug];

if (!project) {
  document.querySelector("#portfolio-details").innerHTML = `
    <div class="container">
      <h2>Project not found</h2>
    </div>
  `;
  return;
}

/* TITLE */
document.getElementById("pd-title").textContent = project.title;
document.getElementById("pd-description").textContent = project.subtitle;

/* META */
document.getElementById("pd-meta").innerHTML = `
  <div class="project-meta">
    <span class="project-badge">${project.role}</span>
    <div class="meta-item">
      <i class="bi bi-calendar-check"></i> ${project.year}
    </div>
    <div class="meta-item">
      <i class="bi bi-buildings"></i> ${project.client}
    </div>
  </div>
`;

/* MAIN TITLE */
document.getElementById("pd-project-title").textContent = project.title;

/* TECH STACK */
document.getElementById("pd-tech").innerHTML = project.tags
  .map((tag) => `<span>${tag}</span>`)
  .join("");

/* SLIDER */
document.getElementById("pd-slider").innerHTML = `
  <div class="swiper init-swiper">
    <div class="swiper-wrapper">
      ${project.images
        .map(
          (img) => `
        <div class="swiper-slide">
          <img src="${img}" class="img-fluid">
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
`;

/* CTA */
document.getElementById("pd-cta").innerHTML = `
  <a href="${project.website}" target="_blank" class="btn-view-project">
    Visit Project
  </a>
`;
