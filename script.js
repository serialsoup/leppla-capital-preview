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
const pyramid = document.querySelector("[data-pyramid]");
const pyramidDetail = document.querySelector("[data-pyramid-detail]");

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

if (pyramid && pyramidDetail) {
  const pyramidLayers = {
    foundation: {
      title: "Foundational Investments",
      text:
        "The broad base of the portfolio. These holdings are designed to provide durability, diversification, and the core market exposure that every disciplined allocation depends on.",
    },
    "core-beta": {
      title: "Core Market Beta",
      text:
        "Market beta gives the portfolio efficient participation in broad asset classes. This layer is built to capture long-term market returns while keeping cost, tax impact, and concentration risk in view.",
    },
    "alpha-one": {
      title: "Alpha Level One",
      text:
        "The first alpha layer introduces more selective opportunities. These positions are intended to improve the portfolio when the risk profile, time horizon, and client objectives support them.",
    },
    "alpha-two": {
      title: "Alpha Level Two",
      text:
        "This layer is used more selectively. It may include higher-conviction or less traditional exposures where the expected return potential justifies the added complexity and risk.",
    },
    direct: {
      title: "Direct Investments",
      text:
        "The top of the pyramid represents the most concentrated and highest-risk opportunities. Direct investments belong only where they fit the client’s broader plan, liquidity needs, and tolerance for volatility.",
    },
  };

  const title = pyramidDetail.querySelector("h3");
  const text = pyramidDetail.querySelector("p");
  const buttons = Array.from(pyramid.querySelectorAll("[data-layer]"));

  const selectLayer = (button) => {
    const layer = pyramidLayers[button.dataset.layer];
    if (!layer || !title || !text) return;

    buttons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    title.textContent = layer.title;
    text.textContent = layer.text;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => selectLayer(button));
  });
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
