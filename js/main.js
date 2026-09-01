/* ==========================================================================
   SHARED SITE BEHAVIOUR
   Runs on every page: mobile navigation, scroll-reveal animation,
   the homepage hero search, and the general contact form.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollReveal();
  initHeroSearch();
  initContactForm();
  if (typeof initWhatsAppButtons === "function") initWhatsAppButtons();
  setActiveNavLink();
});

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".mobile-nav");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- Highlight current page in nav ---------- */
function setActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Hero search (homepage) redirects to properties.html with query params ---------- */
function initHeroSearch() {
  const form = document.getElementById("hero-search-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = form.querySelector('[name="location"]').value;
    const type = form.querySelector('[name="type"]').value;
    const price = form.querySelector('[name="price"]').value;

    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (price) params.set("price", price);

    window.location.href = `properties.html${params.toString() ? "?" + params.toString() : ""}`;
  });
}

/* ---------- General contact form (contact.html) ---------- */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const formWrap = document.getElementById("contact-form-wrap");
  const successWrap = document.getElementById("contact-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value.trim();
    const propertyInterest = form.querySelector('[name="property"]').value;

    let message = `Hello ${COMPANY_NAME}, my name is ${name}. I sent an enquiry through your website`;
    message += propertyInterest ? ` about ${propertyInterest}.` : ".";

    const link = document.getElementById("contact-success-whatsapp");
    if (link) link.setAttribute("href", buildWhatsAppLink(message));

    if (formWrap) formWrap.style.display = "none";
    if (successWrap) successWrap.classList.add("is-visible");
    successWrap.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
