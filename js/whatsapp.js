/* ==========================================================================
   WHATSAPP CONFIGURATION
   --------------------------------------------------------------------------
   This is the ONLY place the WhatsApp number lives. Replace the digits
   below with JAT Global's real WhatsApp number (international format,
   no "+", no spaces — e.g. Nigerian numbers start with 234).
   ========================================================================== */

const WHATSAPP_NUMBER = "2348000000000"; // TODO: replace with JAT Global's real WhatsApp number

const COMPANY_NAME = "JAT Global Property Limited";

/**
 * Builds a wa.me link with a URL-encoded, pre-filled message.
 * @param {string} message - Plain text message to pre-fill.
 * @returns {string} A ready-to-use https://wa.me/ URL.
 */
function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Generic enquiry message (used on the floating button, hero, contact page).
 */
function getGeneralWhatsAppLink() {
  const message = `Hello ${COMPANY_NAME}, I would like to speak with someone about your available properties.`;
  return buildWhatsAppLink(message);
}

/**
 * Property-specific enquiry message.
 * @param {object} property - A property record from PROPERTIES.
 */
function getPropertyWhatsAppLink(property) {
  const message = `Hello ${COMPANY_NAME}, I am interested in ${property.title} in ${property.location}. I would like to get more information about this property.`;
  return buildWhatsAppLink(message);
}

/**
 * Property-specific inspection request message.
 * @param {object} property - A property record from PROPERTIES.
 * @param {object} [details] - Optional { name, date } collected from the inspection form.
 */
function getInspectionWhatsAppLink(property, details) {
  let message = `Hello ${COMPANY_NAME}, I would like to book an inspection for ${property.title} in ${property.location}.`;
  if (details && details.name) {
    message += ` My name is ${details.name}.`;
  }
  if (details && details.date) {
    message += ` I would prefer ${details.date}.`;
  }
  return buildWhatsAppLink(message);
}

/**
 * Wires up every element with [data-whatsapp="general"] to the general link,
 * and every element with [data-whatsapp-property="ID"] to that property's link.
 * Call this once on each page after the DOM (and PROPERTIES, if used) is ready.
 */
function initWhatsAppButtons() {
  document.querySelectorAll('[data-whatsapp="general"]').forEach((el) => {
    el.setAttribute("href", getGeneralWhatsAppLink());
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  document.querySelectorAll("[data-whatsapp-property]").forEach((el) => {
    const id = Number(el.getAttribute("data-whatsapp-property"));
    const property = typeof getPropertyById === "function" ? getPropertyById(id) : null;
    if (property) {
      el.setAttribute("href", getPropertyWhatsAppLink(property));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
}
