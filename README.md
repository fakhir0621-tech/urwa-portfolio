# Urwa Zareef — Portfolio

A professional portfolio website built with React.js, styled after the green/gold Olivia Smith reference design.

## Features

- ✅ **Exact UI/UX** from reference screenshots (green & gold color scheme)
- ✅ **Dark mode toggle** — text readable in both modes
- ✅ **Photo upload** — hero section & about section (click placeholder or upload button)
- ✅ **Project gallery** — click any project card to open a modal gallery, add screenshots
- ✅ **Typing animation** in hero section
- ✅ **Skills marquee** scrolling banner
- ✅ **Contact form** with success feedback
- ✅ **Fully responsive** — tested down to 360px (smallest Android screens)
- ✅ **Active section tracking** in navbar
- ✅ **Back to top button**
- ✅ Runs on **port 3005** (not 3000 or 3001)

---

## Quick Start

### Step 1 — Prerequisites
Make sure you have **Node.js** installed (v16+).
```bash
node -v   # should show v16 or higher
```

### Step 2 — Install dependencies
```bash
cd urwa-portfolio
npm install
```

### Step 3 — Run (port 3005)
```bash
npm start
```

This opens: **http://localhost:3005**

---

## How to use features

### Upload your photo
- **Hero section**: Click the circular placeholder or the "Upload Photo" button below it
- **About section**: Click the rectangular image frame or "Upload Photo" button

### Project gallery
- Click any project card to open the gallery modal
- Inside the modal, click "Add Screenshot" to upload project images
- Hover over a project card and click "Upload Cover" to set the card thumbnail

### Dark mode
- Click the 🌙/☀️ icon in the top-right of the navbar

---

## Project Structure

```
urwa-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── App.js          ← All components in one file
│   ├── index.css       ← All styles (CSS variables, dark mode, responsive)
│   └── index.js        ← React entry point
├── package.json
└── README.md
```

---

## Customization

All your data is at the top of `src/App.js`:
- `services` — your service offerings
- `skills` — technical skills by category
- `projects` — project cards
- `experience` — work history
- `education` — degrees
- `certs` — certificates

Colors are in `src/index.css` under `:root` and `[data-theme="dark"]`.

---

## Build for production

```bash
npm run build
```

Output goes to the `build/` folder — upload it to any static host (Netlify, Vercel, GitHub Pages).
