# AI Agent Guide: Developer Utilities Web App

Welcome! This file provides a comprehensive guide for future AI agents to understand the architecture, design patterns, theme system, and development guidelines of this repository.

## 1. Project Overview
This project is a React-based single-page application containing a rich collection of developer utilities, financial tools, and text helpers.
- **Routing**: Handled in `src/App.js` using `react-router-dom` (v5).
- **Core Layout**: Split into a top app bar (`Header.js`), a navigation drawer (`Sidebar.js`), and a dynamic main content wrapper (`main-content`) that houses the currently routed component.
- **Design Language**: Strictly designed around **Google's Material Design 3 (MD3)** principles.

---

## 2. Design System & Theming (Crucial)

To prevent visual regressions, follow these strict theming and design rules.

### Light & Dark Theme Variables
The theme is powered by CSS Custom Properties (variables) defined in `src/index.css`.
- **Default (Light Mode)**: Variables are declared on the `:root` pseudo-class.
- **Dark Mode**: Overridden via the `[data-theme="dark"]` attribute selector.
- **Toggle Mechanism**: Managed in `src/App.js` via the `theme` state (`light` or `dark`), which applies `data-theme` to `document.documentElement` when toggled. The user's system preferences are automatically checked on load.

### Global Material Design 3 Overrides
Rather than refactoring style markup in individual component files, Bootstrap 4's default classes are globally overridden in `src/index.css` to respect the MD3 design system:
- **Cards (`body .card`)**: Structured with `var(--md-sys-color-surface-1)` background, pill-shape rounded corners (`border-radius: 12px`), and subtle outlines.
- **Buttons (`.btn-primary`, `.btn-light`, etc.)**: Transformed into pill buttons (`border-radius: 20px`) matching standard MD3 specs.
- **Active Navigation States**: Sidebar navigation list items use the active pill highlight `var(--md-sys-color-primary-container)` and `var(--md-sys-color-on-primary-container)`.
- **Contrast Control**:
  - Hover states on tables (`.table-hover tbody tr:hover td`) explicitly lock color values so text doesn't turn black/invisible in dark mode.
  - Readonly fields (`input[readonly]`) have custom overrides to prevent white-on-white text issues caused by hardcoded `#f8f9fa` backgrounds in legacy markup.

### Canvas & Dynamic Charts (Hex Color Fallback)
Chart libraries (like `react-google-charts` in `InvestedVsGainChart.js`) render color values onto a canvas and **do not support CSS variables**. 
- You **must** pass the current `theme` string as a prop down to any canvas-based charts.
- Dynamically toggle raw hex values in the chart options based on the `theme` (e.g., `#E6E1E5` for dark text vs `#1C1B1F` for light text).

---

## 3. Directory Structure

```
├── public/                 # Static assets and index.html
├── scripts/
│   └── generate-routes-seo.js # Post-build script to inject SEO meta tags for each tool
├── src/
│   ├── App.js              # Root router, shell layout, and theme state management
│   ├── index.js            # Entry point importing Bootstrap and index.css
│   ├── index.css           # Global MD3 Design Tokens & CSS overrides (Central Style Sheet)
│   ├── helpers/            # Shared formatting/logic helper functions
│   └── components/         # Tool folders (e.g., sip-calculator, emi-calculator, etc.)
│       ├── common/         # Shared component wrappers (Inputs, Links)
│       ├── header/         # Top App Bar and responsive Menu button
│       └── sidebar/        # Sidebar Navigation Drawer
```

---

## 4. Guidelines for Future AI Agents

When modifying or adding features to this application, adhere to these strict rules:

### 1. Maintain Logic Integrity
- Do not modify files under `src/helpers/` or calculations inside component files unless explicitly requested. 
- Keep style refactoring isolated to CSS classes and visual variables.

### 2. UI/UX Hierarchy & Aesthetics
- **DO NOT** use generic, highly saturated colors (e.g., standard red, blue, green). Always map colors to the theme design system tokens (e.g., `primary`, `on-surface-variant`, `surface-1`, etc.).
- Outlined containers, cards, and input fields should use subtle outlines (`--md-sys-color-outline`) instead of harsh borders.

### 3. Adding New Components
If you add a new utility component:
1. Register it in `src/App.js` within the `Switch`/`Route` block.
2. Add a `ButtonLink` to it inside the appropriate section of `src/components/sidebar/Sidebar.js`.
3. If it contains outputs, apply `className="form-control" readOnly` to let the global CSS correctly theme it. Do not hardcode `#f8f9fa` or similar background styles.

---

## 5. Deployment & SEO

The application is deployed using GitHub Pages.
- **Build & Post-build**: Running `npm run deploy` triggers `npm run build` which subsequently executes `scripts/generate-routes-seo.js`.
- **SEO Route Generator**: This script scrapes the routes and generates static subfolders in the `build/` directory with SEO meta-tags pre-injected. This ensures that crawlers can index pages like `https://domain.com/sip-calculator` directly with accurate metadata.
