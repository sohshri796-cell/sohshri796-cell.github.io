# Soham — Portfolio

A personal portfolio website showcasing projects, writing, and background in embedded systems, firmware, RTOS, and low-level computing.

Built as a static site with plain **HTML, CSS, and JavaScript** — no build tools, frameworks, or package dependencies.

## Features

- **Responsive editorial layout** for mobile, tablet, and desktop
- **Light/dark theme toggle** with preference saved in `localStorage` and system-theme fallback
- **Interactive hero section** with an animated expedition/climber stage
- **Projects section** with filterable project cards and dedicated project detail pages
- **Writing section** for technical notes/articles
- **Accessible navigation and UI details** (focus states, reduced-motion considerations, semantic sections)

## Project structure

```text
.
├── index.html                  # Main landing page (hero, about/context, work, contact)
├── writing.html                # Writing/articles index
├── projects/
│   ├── astraritos.html         # AstraRTOS project page
│   └── microkernel.html        # Microkernel project page
├── writing/
│   └── mpu-driver.html         # ARM Cortex-M MPU driver write-up
├── style.css                   # Global styles, themes, layout, animations
├── script.js                   # Theme toggle, interactions, filters, UI behavior
└── README.md
```

## Getting started

No installation is required.

### Run locally

1. Clone or download this repository.
2. Open `index.html` in a browser.

> Fonts are loaded from Google Fonts. The site will still work with fallback fonts if they are unavailable.

## Customization

Before publishing, search the project for placeholder values and replace them with your own:

- `YOUR_EMAIL@example.com` — your email address
- `YOUR_GITHUB` — your GitHub username/profile/repo links
- `YOUR_LINKEDIN` — your LinkedIn profile slug

You may also want to update:

- Project descriptions and links in `index.html` and files under `projects/`
- Writing entries and external links in `writing.html` and files under `writing/`
- Contact/social links in `index.html`
- Metadata (title/description/theme color) in each HTML file

## Deployment (GitHub Pages)

1. Push this repository to GitHub.
2. In your repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or your default branch) and `/ (root)`
4. Save and wait for GitHub Pages to publish the site.

Your site will be available at the URL shown in the Pages settings.

## Tech stack

- HTML
- CSS
- Vanilla JavaScript

## License

No license file is included in this repository yet. If you plan to make the code reusable by others, consider adding a `LICENSE` file (for example, MIT).
