# Soham — Editorial Portfolio

A responsive portfolio site for GitHub Pages. Built with plain HTML, CSS, and JavaScript; no build tools or frameworks required. Optimised across mobile, tablet, and desktop viewports.

## Structure

```
index.html              — main single page (hero with expedition simulation stage, context, work, contact)
writing.html            — writings and technical articles (links out to project sites / blogs)
projects/
  astraritos.html       — AstraRTOS detail page (ongoing)
  microkernel.html      — Microkernel detail page (ongoing)
writing/
  mpu-driver.html       — ARM Cortex-M MPU Driver technical write-up
style.css               — responsive typography, high-contrast themes, and physics keyframes
script.js               — theme switcher, climber cursor tracking physics, typing effect, project filters
```

## Preview locally

Open `index.html` in any web browser. Google Fonts are loaded from the web; the site still works if they are unavailable, using fallback system fonts.

## Features & Customizations

### 1. Interactive Expedition Stage (Hero Element)
- Replaced the old sticker with a widescreen, framed **Expedition Simulation Stage** (`.climber-stage-card`) set in a 2-column hero layout.
- Features a detailed landscape with elevation contours, distant peaks, rugged cliff face, summit flag at 3,000m, and an articulated mountaineer.
- The climber visibly struggles up the cliff, steps between rock ledges, and pulls his weight upward.
- **The Slip & Recovery**: Mid-ascent, his foot slips off a loose rock ledge. Pebbles scatter, he plunges down and swings out over the void in panic with flying sweat drops and scrambling legs. His hand snaps onto an emergency ledge to arrest the fall with elastic recoil, sighs with relief, regains footing, and continues climbing to the summit flag.
- **Real-Time Cursor Tracking**: The climber's head and eyes smoothly follow your cursor across the hero in 2D space, and his torso subtly leans toward you. The simulation never freezes on hover.
- Includes a live altitude counter (2,450m – 3,000m) and dynamic ticker status bar.

### 2. High-Contrast Dark Mode & Restored Light Palettes
- Restored the original warm editorial paper finish (`#f4f1e9`) with deep cobalt accents for light mode.
- Redesigned dark mode using a warm carbon background (`#121214`) and surface cards (`#18181b`) with crisp white text (`#f5f5f7`) and vivid amber-orange accents (`#f97316`), giving an authentic engineering/terminal aesthetic without generic "slop".

### 3. Aligned Writing Section
- Rebuilt `writing.html` with an editorial article card (`.writing-card`) with surgical alignment across all screen sizes.
- No invalid nested `<a>` tags. Features the **ARM Cortex-M MPU Driver** with direct external website navigation (`target="_blank" rel="noopener noreferrer"`), a "Website ↗" badge, and clean action buttons.

### 4. About Section & Navigation
- The standalone about card was removed. Clicking **"about"** in the top navigation smoothly scrolls directly to the **"A LITTLE CONTEXT"** strip (`#about`) with proper scroll margins.

### 5. Ongoing Projects (AstraRTOS & Microkernel)
- Selected work features two ongoing low-level builds: **AstraRTOS** (bare-metal RTOS for Cortex-M4) and **Microkernel** (minimal capability-based microkernel with synchronous IPC).

### 6. GitHub Pages Compatibility
- 100% vanilla HTML, CSS, and JavaScript.
- Zero npm dependencies, zero build steps, and zero bundlers. Simply upload to your GitHub repository and enable GitHub Pages under repository settings.

## Before publishing

Search the project for `YOUR_` and replace these placeholders:
- `YOUR_EMAIL@example.com` — email address
- `YOUR_GITHUB` — GitHub username
- `YOUR_LINKEDIN` — LinkedIn profile slug
- Project and writing links pointing to your external repositories or documentation websites.
