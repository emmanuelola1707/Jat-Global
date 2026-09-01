/* ==========================================================================
   PROPERTIES LISTING PAGE (properties.html)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("property-grid");
  if (!grid) return; // not on the listings page

  const form = document.getElementById("filters-form");
  const locationInput = form.querySelector('[name="location"]');
  const typeInput = form.querySelector('[name="type"]');
  const priceInput = form.querySelector('[name="price"]');
  const keywordInput = form.querySelector('[name="keyword"]');
  const sortInput = document.getElementById("sort-select");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");

  populateLocationOptions(locationInput);
  applyParamsFromURL(locationInput, typeInput, priceInput);

  function getFiltered() {
    const location = locationInput.value;
    const type = typeInput.value;
    const price = priceInput.value;
    const keyword = (keywordInput.value || "").toLowerCase().trim();

    return PROPERTIES.filter((p) => {
      if (location && p.location !== location) return false;
      if (type && p.type !== type) return false;
      if (price) {
        const [min, max] = price.split("-").map(Number);
        if (max) {
          if (p.price < min || p.price > max) return false;
        } else {
          if (p.price < min) return false;
        }
      }
      if (keyword) {
        const haystack = `${p.title} ${p.location} ${p.type}`.toLowerCase();
        if (!haystack.includes(keyword)) return false;
      }
      return true;
    });
  }

  function getSorted(list) {
    const sorted = [...list];
    const sortBy = sortInput.value;
    if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => b.id - a.id); // newest first
    return sorted;
  }

  function render() {
    const filtered = getSorted(getFiltered());

    resultsCount.textContent = `${filtered.length} ${filtered.length === 1 ? "property" : "properties"} found`;

    if (filtered.length === 0) {
      grid.style.display = "none";
      emptyState.style.display = "block";
      return;
    }

    grid.style.display = "grid";
    emptyState.style.display = "none";
    grid.innerHTML = filtered.map(renderCard).join("");
    if (typeof initWhatsAppButtons === "function") initWhatsAppButtons();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    render();
  });
  [locationInput, typeInput, priceInput, sortInput].forEach((el) => el.addEventListener("change", render));
  keywordInput.addEventListener("input", debounce(render, 250));

  render();
});

function populateLocationOptions(select) {
  const locations = [...new Set(PROPERTIES.map((p) => p.location))].sort();
  locations.forEach((loc) => {
    const option = document.createElement("option");
    option.value = loc;
    option.textContent = loc;
    select.appendChild(option);
  });
}

function applyParamsFromURL(locationInput, typeInput, priceInput) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("location")) locationInput.value = params.get("location");
  if (params.get("type")) typeInput.value = params.get("type");
  if (params.get("price")) priceInput.value = params.get("price");
}

function renderCard(p) {
  const metaLine =
    p.bedrooms != null
      ? `<div class="property-meta"><span>${p.bedrooms} Beds</span><span>${p.bathrooms} Baths</span><span>${p.size}</span></div>`
      : `<div class="property-meta"><span>${p.size}</span></div>`;

  return `
    <article class="property-card reveal is-visible">
      <a href="property.html?id=${p.id}" class="property-media" aria-label="View details for ${p.title}">
        ${p.featured ? `<span class="property-badge">Featured</span>` : ""}
        <span class="property-status">${p.status}</span>
        <img src="${p.image}" alt="${p.title} in ${p.location}" loading="lazy">
      </a>
      <div class="property-body">
        <span class="property-type">${p.type}</span>
        <h3 class="property-title"><a href="property.html?id=${p.id}">${p.title}</a></h3>
        <div class="property-location">${locationPin()} ${p.location}</div>
        ${metaLine}
        <div class="property-price">${formatNaira(p.price)}</div>
        <div class="property-actions">
          <a href="property.html?id=${p.id}" class="btn btn-outline btn-sm">View Details</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-whatsapp-property="${p.id}">WhatsApp</a>
        </div>
      </div>
    </article>
  `;
}

function locationPin() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
