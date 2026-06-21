# BigQuery Releases & Events Hub 🌐

Welcome to the **BigQuery Releases & Events Hub**! This is a modern, premium, and fully responsive developer portal built with native web standards to track Google Cloud BigQuery releases and developer talks/events.

## 🚀 Live Preview / How to View

The application is built completely with vanilla web technologies, meaning **no complex build steps are required**.

### Option 1: Double-Click (Easiest)
Simply open the `index.html` file in any modern web browser:
1. Locate [index.html](index.html) in your file explorer.
2. Double-click it to open it directly in Chrome, Edge, Firefox, or Safari.

### Option 2: Live Local Server (Recommended)
Running a local web server enables proper URL routing and caching options. You can start one instantly:

**Using Node.js:**
```bash
npx serve .
# or
npx http-server .
```

**Using Python:**
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` (or the port specified by the terminal) in your browser.

---

## 🎨 Design & Aesthetic Features

- **Rich Premium Dark Mode**: High-contrast theme designed with HSL-based color tokens, soft radial background glows, and clean typography (`Outfit` & `Inter`).
- **Glassmorphism Panels**: UI cards and control panels styled with semi-transparent backdrops (`backdrop-filter: blur()`) to match modern software design conventions.
- **Micro-Animations**: Hover animations on stats, cards, filters, and modals, utilizing cubic-bezier transitions for premium fluid animations.
- **Interactive Modals**: Detailed pop-ups with dynamic code rendering, detailed descriptions, and external link triggers.
- **SEO Ready**: Semantic HTML5 elements (`<header>`, `<main>`, `<section>`), unique IDs, and correct meta tags.

---

## 🛠️ Stack & Implementation

1. **Structure**: Semantic `HTML5` elements.
2. **Style**: Vanilla `CSS3` variables (theme scopes), CSS grids, flexbox, custom scrollbars, and keyframe animations.
3. **Logic**: Native `JavaScript (ES6+)` managing application state, search indexing, dynamic category filtering, modal layout rendering, and theme swapping (persisted via `localStorage`).

---

## 📂 Project Structure

```
bq-releases-notes/
├── index.html        # Main entrypoint and UI structures
├── style.css         # Styling system & theme declarations
├── app.js            # Mock dataset & interactive handlers
├── .gitignore        # Version control exclusions
└── README.md         # Documentation
```
