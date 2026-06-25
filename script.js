const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav, .figma-nav");
const form = document.querySelector(".contact-form, .figma-form");
const formNote = document.querySelector(".form-note");
const carousel = document.querySelector("[data-carousel]");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const featuredRail = document.querySelector("[data-featured-rail]");
const featuredPrev = document.querySelector("[data-featured-prev]");
const featuredNext = document.querySelector("[data-featured-next]");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (carousel && carouselPrev && carouselNext) {
  const stepCarousel = (direction) => {
    const firstCard = carousel.querySelector(".network-card");
    const distance = firstCard ? firstCard.getBoundingClientRect().width + 20 : 320;
    carousel.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  carouselPrev.addEventListener("click", () => stepCarousel(-1));
  carouselNext.addEventListener("click", () => stepCarousel(1));
}

if (featuredRail && featuredPrev && featuredNext) {
  const stepFeaturedRail = (direction) => {
    const firstCard = featuredRail.querySelector(".figma-resource-card");
    const distance = firstCard ? firstCard.getBoundingClientRect().width + 18 : 300;
    featuredRail.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  featuredPrev.addEventListener("click", () => stepFeaturedRail(-1));
  featuredNext.addEventListener("click", () => stepFeaturedRail(1));
}

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const firstName = data.get("first-name") || "";
    const lastName = data.get("last-name") || "";
    const subject = encodeURIComponent("Leppla Capital website inquiry");
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${data.get("email") || ""}\nPhone: ${data.get("phone") || ""}\nCompany / Institution: ${data.get("company") || ""}\n\n${data.get("comments") || ""}`
    );

    formNote.textContent = "Opening your email client...";
    window.location.href = `mailto:samahn@lepplacap.com?subject=${subject}&body=${body}`;
  });
}
