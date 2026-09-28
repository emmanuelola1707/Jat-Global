/* ==========================================================================
   PROPERTY DETAILS PAGE (property.html?id=)
   ========================================================================== */

let currentProperty = null;
let currentGalleryIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("property-detail");
  if (!root) return; // not on the details page

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  currentProperty = getPropertyById(id);

  if (!currentProperty) {
    root.innerHTML = notFoundMarkup();
    document.title = "Property Not Found — JAT Global Property Limited";
    return;
  }

  renderProperty(currentProperty);
  renderRelated(currentProperty);
  initGalleryLightbox(currentProperty);
  initInspectionModal(currentProperty);
  if (typeof initWhatsAppButtons === "function") initWhatsAppButtons();
});

function renderProperty(p) {
  document.title = `${p.title} — JAT Global Property Limited`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", `${p.title} in ${p.location}. ${formatNaira(p.price)}. ${p.description.slice(0, 100)}...`);

  setText("breadcrumb-title", p.title);
  setText("detail-title", p.title);
  setText("detail-location", p.location);
  setText("detail-price", formatNaira(p.price));
  setText("detail-status", p.status);
  setText("detail-description", p.description);

  document.getElementById("gallery-main-img").src = p.gallery[0];
  document.getElementById("gallery-main-img").alt = `${p.title} — main image`;

  const thumbWrap = document.getElementById("gallery-thumbs");
  thumbWrap.innerHTML = p.gallery
    .slice(1, 4)
    .map((src, i) => {
      const isLast = i === 2 && p.gallery.length > 4;
      return `<button type="button" class="gallery-thumb-btn ${isLast ? "is-more" : ""}" data-index="${i + 1}" ${isLast ? `data-more="+${p.gallery.length - 4} more"` : ""}>
        <img src="${src}" alt="${p.title} photo ${i + 2}" loading="lazy">
      </button>`;
    })
    .join("");

  const specWrap = document.getElementById("spec-strip");
  const specs = [];
  if (p.bedrooms != null) specs.push({ label: "Bedrooms", value: p.bedrooms });
  if (p.bathrooms != null) specs.push({ label: "Bathrooms", value: p.bathrooms });
  specs.push({ label: "Size", value: p.size });
  specs.push({ label: "Type", value: p.type });
  specWrap.innerHTML = specs.map((s) => `<div class="spec"><strong>${s.value}</strong><span>${s.label}</span></div>`).join("");

  const featureWrap = document.getElementById("feature-list");
  featureWrap.innerHTML = p.features
    .map((f) => `<li>${checkIcon()} ${f}</li>`)
    .join("");

  const nearbyWrap = document.getElementById("nearby-list");
  nearbyWrap.innerHTML = p.nearby.map((n) => `<li>${n}</li>`).join("");

  document.querySelectorAll("[data-whatsapp-property]").forEach((el) => el.setAttribute("data-whatsapp-property", p.id));
  document.querySelectorAll("[data-inspection-trigger]").forEach((el) => el.setAttribute("data-inspection-trigger", p.id));
}

function renderRelated(current) {
  const wrap = document.getElementById("related-grid");
  if (!wrap) return;
  const related = PROPERTIES.filter((p) => p.id !== current.id && p.type === current.type).slice(0, 3);
  const fallback = related.length ? related : PROPERTIES.filter((p) => p.id !== current.id).slice(0, 3);

  wrap.innerHTML = fallback
    .map(
      (p) => `
    <article class="property-card">
      <a href="property.html?id=${p.id}" class="property-media">
        <span class="property-status">${p.status}</span>
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </a>
      <div class="property-body">
        <span class="property-type">${p.type}</span>
        <h3 class="property-title"><a href="property.html?id=${p.id}">${p.title}</a></h3>
        <div class="property-location">${p.location}</div>
        <div class="property-price">${formatNaira(p.price)}</div>
        <div class="property-actions">
          <a href="property.html?id=${p.id}" class="btn btn-outline btn-sm">View Details</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-whatsapp-property="${p.id}">WhatsApp</a>
        </div>
      </div>
    </article>`
    )
    .join("");
}

/* ---------- Gallery + lightbox ---------- */
function initGalleryLightbox(p) {
  const mainImg = document.getElementById("gallery-main-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  function openLightbox(index) {
    currentGalleryIndex = index;
    lightboxImg.src = p.gallery[index];
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function step(delta) {
    currentGalleryIndex = (currentGalleryIndex + delta + p.gallery.length) % p.gallery.length;
    lightboxImg.src = p.gallery[currentGalleryIndex];
  }

  mainImg.addEventListener("click", () => openLightbox(0));
  document.getElementById("gallery-thumbs").addEventListener("click", (e) => {
    const btn = e.target.closest(".gallery-thumb-btn");
    if (!btn) return;
    openLightbox(Number(btn.getAttribute("data-index")));
  });
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* ---------- Inspection modal ---------- */
function initInspectionModal(p) {
  const overlay = document.getElementById("inspection-modal");
  const openBtns = document.querySelectorAll("[data-inspection-trigger]");
  const closeBtn = document.getElementById("inspection-close");
  const form = document.getElementById("inspection-form");
  const formWrap = document.getElementById("inspection-form-wrap");
  const successWrap = document.getElementById("inspection-success");

  function open() {
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    formWrap.style.display = "block";
    successWrap.classList.remove("is-visible");
    form.reset();
  }
  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => btn.addEventListener("click", (e) => { e.preventDefault(); open(); }));
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="fullname"]').value.trim();
    const date = form.querySelector('[name="date"]').value;

    const link = document.getElementById("inspection-success-whatsapp");
    link.setAttribute("href", getInspectionWhatsAppLink(p, { name, date }));

    formWrap.style.display = "none";
    successWrap.classList.add("is-visible");
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function checkIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
}

function notFoundMarkup() {
  return `
    <div class="section" style="text-align:center">
      <h1>Property Not Found</h1>
      <p style="margin:16px auto 28px;max-width:40ch">This listing may have been removed or the link is incorrect.</p>
      <a href="properties.html" class="btn btn-primary">Browse All Properties</a>
    </div>`;
}
