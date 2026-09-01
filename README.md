# JAT Global Property Limited — Website Demo

A static HTML/CSS/JavaScript real estate website demo built for **JAT Global Property Limited** (Lagos, Nigeria), to present as a concept for turning their social‑media property marketing into a professional online catalogue.

No backend, no build step, no framework — pure HTML/CSS/JS, ready to deploy to Vercel as-is.

---

## 1. Run it locally

You don't need Node.js or any build tools. Any static file server works:

**Option A — VS Code**
Install the "Live Server" extension, right-click `index.html` → "Open with Live Server".

**Option B — Python** (already on most machines)
```bash
cd jat-global
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

**Option C — just open the file**
Double-click `index.html`. Everything works except the hero search redirect, which needs a server (browsers block `fetch`-like relative navigation from `file://` in some cases) — Options A/B are more reliable.

---

## 2. Put it on GitHub

```bash
cd jat-global
git init
git add .
git commit -m "Initial JAT Global website demo"
git branch -M main
git remote add origin https://github.com/<your-username>/jat-global-website.git
git push -u origin main
```

---

## 3. Deploy to Vercel

**Easiest — via the Vercel dashboard:**
1. Go to vercel.com → **Add New Project**.
2. Import the GitHub repo you just pushed.
3. Framework preset: choose **"Other"** (this is a static site — no build command needed).
4. Click **Deploy**.

**Or via CLI:**
```bash
npm i -g vercel
cd jat-global
vercel
```
Follow the prompts (accept the defaults — static sites need no build step).

---

## 4. Where to change the WhatsApp number

Open **`js/whatsapp.js`** and edit the very first line:

```js
const WHATSAPP_NUMBER = "2348000000000"; // replace with the real number
```

Use the international format with no `+`, no spaces, no leading `0` (e.g. a Nigerian number `080XXXXXXXX` becomes `234XXXXXXXXX`). Every WhatsApp button on the site — hero, property cards, property details, contact page, floating button, inspection modal — reads from this single constant, so you only need to change it once.

---

## 5. Where to replace the demo property images and listings

Open **`js/data.js`**. Each property is one object inside the `PROPERTIES` array:

```js
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
  image: "...",       // card thumbnail
  gallery: ["...", "...", "...", "..."],  // property details gallery
  description: "...",
  features: ["...", "..."],
  nearby: ["...", "..."]
}
```

To use real photos: replace the `image` and `gallery` URLs with links to your own hosted images (Cloudinary, Imgur, your own `/assets/images/` folder, etc.), or drop image files into `assets/images/` and point to them with a relative path, e.g. `"assets/images/solace-city-1.jpg"`.

To add, remove or edit listings, add/remove objects in this array — the property grid, filters, sorting and detail pages all read from it automatically. `id` must be unique.

---

## 6. Where to edit company information

- **Email, Instagram, Facebook, location:** appears in the footer and on `contact.html` (`ailemejoy@gmail.com`, `@jat_global_propertylimited`, `Jat Global Property Limited`) — search-and-replace across the `.html` files if any of these change.
- **Company name / brand:** `JAT GLOBAL` / `PROPERTY LIMITED` appears in the navbar and footer of every page.
- **WhatsApp number:** see Section 4 above.

---

## 7. What's next (future-ready architecture)

This demo intentionally has **no backend or admin login** — it's a presentation piece. The next version can add, without changing this structure much:

- **Supabase** as the data source (swap `js/data.js`'s static array for a `fetch()`/Supabase client call returning the same shape).
- **Admin login + dashboard** to add/edit/delete properties, upload images, toggle "Featured", and change status/price.
- **Enquiry management** — the contact and inspection forms already collect the right fields; they just need a destination (Supabase table, email service, or WhatsApp Business API) instead of the current front-end-only success state.

---

## Project structure

```
/
├── index.html          Homepage
├── properties.html      Listings with search/filter/sort
├── property.html        Property details (property.html?id=1)
├── about.html
├── services.html
├── contact.html
├── css/
│   ├── style.css        Design system + components
│   └── responsive.css   Breakpoints
├── js/
│   ├── data.js           Demo property data (replace with real listings)
│   ├── whatsapp.js        Central WhatsApp number + link builders
│   ├── main.js            Shared behaviour (nav, reveal animation, hero search, contact form)
│   ├── properties.js       Listings page logic
│   └── property.js         Details page logic
├── robots.txt
└── sitemap.xml
```
