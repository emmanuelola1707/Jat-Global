/* ==========================================================================
   DEMO PROPERTY DATA
   --------------------------------------------------------------------------
   This array simulates a database table. Every property card, filter and
   detail page reads from PROPERTIES. When a real backend (e.g. Supabase)
   is added, this file can be replaced by a fetch() call that returns
   records in the same shape — nothing else in the codebase needs to change.

   NOTE: These are demo listings created for presentation purposes only.
   Replace images, prices and details with JAT Global's real inventory
   before publishing.
   ========================================================================== */

const PROPERTIES = [
  {
    id: 1,
    title: "4-Bedroom Bungalow, Solace City",
    location: "Ibeju-Lekki, Lagos",
    price: 85000000,
    type: "Duplex",
    status: "Now Selling",
    bedrooms: 4,
    bathrooms: 5,
    size: "450 sqm",
    featured: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A 4-bedroom bungalow with a private BQ, set within a gated estate on the Lekki-Epe corridor. Finished with a private borehole, underground electrification and a solar-ready roof, the home is built for buyers who want a turnkey property close to Lagos's fastest-growing axis.",
    features: ["Private BQ", "Underground electrification", "Solar-ready roofing", "Gated estate with 24-hour security", "Tarred access road", "Governor's Consent in progress"],
    nearby: ["Lekki Free Trade Zone", "Dangote Refinery", "Lekki-Epe Expressway", "Novaro Wealth Estate"]
  },
  {
    id: 2,
    title: "3-Bedroom Bungalow, Solace City",
    location: "Ibeju-Lekki, Lagos",
    price: 72000000,
    type: "Duplex",
    status: "Now Selling",
    bedrooms: 3,
    bathrooms: 4,
    size: "380 sqm",
    featured: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A 3-bedroom bungalow with a private kitchen, designed for young families who want the security and finishing of an estate without leaving the Ibeju-Lekki growth corridor. Comes with a government allocation and a structured initial-deposit plan.",
    features: ["Private kitchen", "Plastered and boarded finishing", "Underground electrification", "Government allocation on unit", "Estate perimeter fencing", "Flexible initial deposit"],
    nearby: ["Lekki Free Trade Zone", "Alaro City", "Lekki-Epe Expressway", "Ibeju-Lekki Local Govt Secretariat"]
  },
  {
    id: 3,
    title: "Serviced Plots, Alpha Garden City Resort",
    location: "Epe, Lagos",
    price: 4500000,
    type: "Land",
    status: "Now Selling",
    bedrooms: null,
    bathrooms: null,
    size: "1 Plot (648 sqm)",
    featured: true,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "Dry, fenced and gated land within Alpha Garden City Resort, sold on a flexible payment plan with land allocation on completion of payment. Popular with first-time land buyers looking to build or hold along the Epe axis.",
    features: ["Dry land, no flooding history", "Fenced and gated estate", "Flexible instalment plan", "Survey and allocation provided", "C of O in progress", "Beachside resort estate"],
    nearby: ["Lekki-Epe Expressway", "Eleko Beach", "Awoyaya", "Free Trade Zone"]
  },
  {
    id: 4,
    title: "Investment Plots, Itura Garden Estate",
    location: "Ogun State (Lagos Border)",
    price: 3200000,
    type: "Investment Opportunity",
    status: "Now Selling",
    bedrooms: null,
    bathrooms: null,
    size: "1 Plot (648 sqm)",
    featured: false,
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A structured investment offering inside Itura Garden Estate, aimed at buyers looking to acquire land early on a 6-month payment plan ahead of estate development. Multiple-plot purchases carry additional allocation benefits.",
    features: ["6-month payment plan", "Bonus allocation on multiple plots", "Close to Lagos state border", "Estate development in progress", "Survey documents provided"],
    nearby: ["Lagos-Ogun border", "Redemption Camp axis", "Mowe-Ibafo", "Lagos-Ibadan Expressway"]
  },
  {
    id: 5,
    title: "AyHomes Buy-Back Plots, Ivory Gate Estate",
    location: "Off Lekki-Epe Expressway, Ilamija Eyin Osa, Lagos",
    price: 1000000,
    type: "Investment Opportunity",
    status: "Now Selling",
    bedrooms: null,
    bathrooms: null,
    size: "1 Plot",
    featured: false,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A structured buy-back plot offering within Ivory Gate Estate for buyers who want a fixed-term return alongside land ownership. Terms and duration options are explained fully by an agent before commitment.",
    features: ["Fixed-term buy-back structure", "Multiple duration options", "Estate off the Lekki-Epe Expressway", "Terms and conditions apply"],
    nearby: ["Lekki-Epe Expressway", "Awoyaya", "Abraham Adesanya"]
  },
  {
    id: 6,
    title: "Commercial Plot, Lekki-Epe Corridor",
    location: "Awoyaya, Lagos",
    price: 28000000,
    type: "Commercial Property",
    status: "Now Selling",
    bedrooms: null,
    bathrooms: null,
    size: "1,000 sqm",
    featured: false,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A corner commercial plot facing the Lekki-Epe corridor, suited to retail, hospitality or office development given rising commercial activity along the axis. Sold with full documentation support.",
    features: ["Corner piece, dual road frontage", "High commercial visibility", "Documentation support provided", "Suitable for retail or office development"],
    nearby: ["Awoyaya Roundabout", "Lekki-Epe Expressway", "Abraham Adesanya Estate"]
  },
  {
    id: 7,
    title: "2-Bedroom Apartment, Novaro Hills Phase 2",
    location: "Ibeju-Lekki, Lagos",
    price: 45000000,
    type: "Apartment",
    status: "Now Selling",
    bedrooms: 2,
    bathrooms: 3,
    size: "120 sqm",
    featured: false,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "A 2-bedroom apartment within Novaro Hills Phase 2, aimed at buyers who want estate living with shared amenities. Offered on a structured deposit plan with monthly instalment options.",
    features: ["Shared estate amenities", "Structured deposit plan", "Modern fittings", "Ibeju-Lekki growth corridor"],
    nearby: ["Lekki Free Trade Zone", "Alaro City", "Dangote Refinery"]
  },
  {
    id: 8,
    title: "Mixed-Use Development Land",
    location: "Sangotedo, Lagos",
    price: 15000000,
    type: "Land",
    status: "Now Selling",
    bedrooms: null,
    bathrooms: null,
    size: "1 Plot (720 sqm)",
    featured: false,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=80"
    ],
    description: "Dry land in Sangotedo suited to residential or light mixed-use development, within reach of existing schools, shopping and the Lekki-Epe Expressway.",
    features: ["Dry, buildable land", "Close to schools and shopping", "Survey provided", "Flexible payment terms"],
    nearby: ["Lekki-Epe Expressway", "Ajah", "Sangotedo Market"]
  }
];

/**
 * Returns a property by its numeric id, or null if not found.
 */
function getPropertyById(id) {
  return PROPERTIES.find((p) => p.id === Number(id)) || null;
}

/**
 * Formats a number as Nigerian Naira, e.g. 85000000 -> "₦85,000,000".
 */
function formatNaira(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}
