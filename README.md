# Web2PDF Demo — Next.js Sample Site

A multi-page Next.js / TypeScript / Tailwind CSS site built to demonstrate
**Veeva Web2PDF's page-capture** and **Hint-sequencing** capabilities across
every supported interaction type.

---

## Table of Contents

1. [What is Veeva Web2PDF?](#what-is-veeva-web2pdf)
2. [How Web2PDF Works — Step by Step](#how-web2pdf-works--step-by-step)
3. [The Hint System](#the-hint-system)
   - [data-vv-action](#data-vv-action)
   - [data-vv-snapshot](#data-vv-snapshot)
   - [data-vv-count](#data-vv-count)
   - [data-vv-seq](#data-vv-seq)
   - [data-vv-fillvalue](#data-vv-fillvalue)
4. [Site Structure](#site-structure)
5. [Pages & Hint Coverage](#pages--hint-coverage)
   - [Home — Hover Nav Dropdown](#home--hover-nav-dropdown)
   - [Home — Image Carousel](#home--image-carousel)
   - [Solutions — Tab Switcher](#solutions--tab-switcher)
   - [Solutions — Video Player](#solutions--video-player)
   - [Solutions — Select Dropdowns](#solutions--select-dropdowns)
   - [Products — Accordion FAQ](#products--accordion-faq)
   - [Contact — Form Fill & Submit](#contact--form-fill--submit)
   - [404 Error Page](#404-error-page)
6. [Sitemap & Crawler Discovery](#sitemap--crawler-discovery)
7. [Getting Started](#getting-started)
8. [Quick Reference](#quick-reference--all-hint-attributes)

---

## What is Veeva Web2PDF?

**Veeva Web2PDF** is a cloud-based service that converts web pages — including
fully JavaScript-rendered single-page applications — into high-fidelity PDFs.
It is designed specifically for the life-sciences industry, where PDF assets
must meet regulatory content requirements and be distributed through Veeva CRM
(Approved Email, eDetailing, etc.).

### Core problem it solves

Traditional PDF generators (`wkhtmltopdf`, `Puppeteer`-as-a-script, etc.) render
a page once at load time. They cannot:

- Open dropdown menus
- Advance image carousels
- Switch between tabs
- Play or pause videos
- Expand collapsed accordion sections
- Select options from a `<select>` element
- Fill and submit forms

Web2PDF solves this with a **declarative Hint system**: you embed `data-vv-*`
attributes directly in your HTML, and the headless-browser crawler reads and
executes them before each snapshot — producing a separate PDF page for every
distinct UI state you annotate.

---

## How Web2PDF Works — Step by Step

```
┌──────────────┐   1. Submit URL + sitemap   ┌────────────────────────┐
│  Your site   │ ─────────────────────────→  │  Web2PDF Job Scheduler │
└──────────────┘                             └──────────┬─────────────┘
                                                        │ 2. Distribute URLs
                                             ┌──────────▼─────────────┐
                                             │  Headless Browser Pool  │
                                             │  (Chromium-based fleet) │
                                             └──────────┬─────────────┘
                                                        │
                     ┌──────────────────────────────────▼───────────────────────────────────┐
                     │  For each URL:                                                        │
                     │                                                                       │
                     │  a) Load page, wait for JS hydration to complete                     │
                     │  b) Scan DOM for data-vv-* Hint attributes                            │
                     │  c) Sort Hints by data-vv-seq (if present), else document order       │
                     │  d) For each Hint:                                                    │
                     │       i.  Optionally snapshot BEFORE the action                      │
                     │       ii. Execute the action (hover / click / fill / fillSubmit)     │
                     │       iii.Optionally snapshot AFTER the action                       │
                     │       iv. Repeat (i-iii) data-vv-count times if specified            │
                     │  e) Combine all snapshots into one or more PDF pages                 │
                     └──────────────────────────────────────────────────────────────────────┘
                                                        │
                                             ┌──────────▼─────────────┐
                                             │  PDF Assembly & Upload  │
                                             │  → Veeva CRM / S3 / API │
                                             └────────────────────────┘
```

### Key concepts

| Concept | Description |
|---------|-------------|
| **Crawl job** | A single request to Web2PDF identifying the root URL and (optionally) a sitemap. The service discovers all linked pages automatically. |
| **Snapshot** | A full-page screenshot taken at a specific moment (before or after a Hint action). Each snapshot becomes one page in the output PDF. |
| **Hint** | A `data-vv-*` HTML attribute that tells the crawler what to do on the element before taking a snapshot. |
| **Sequence** | The ordered list of Hint actions the crawler executes on a page. Controlled via `data-vv-seq`. |

---

## The Hint System

Hints are plain HTML `data-*` attributes — no JavaScript, no build-time tooling.
They are invisible to end users and gracefully ignored by non-Web2PDF browsers.

### `data-vv-action`

The action type to perform on the element.

| Value | Behaviour |
|-------|-----------|
| `hover` | Simulate a `mouseover` / `mouseenter` event. Use on nav triggers, tooltip anchors, etc. |
| `click` | Simulate a mouse click. Use on buttons, accordion headers, carousel controls, tabs, video play buttons, etc. |
| `fill` | Type a value into a form field (`<input>`, `<textarea>`, `<select>`). Must be paired with `data-vv-fillvalue`. |
| `fillSubmit` | Fill all sibling `fill`-Hinted fields in the same form, then click this element (the submit button). |

### `data-vv-snapshot`

Controls **when** the snapshot is taken relative to the action.

| Value | Behaviour |
|-------|-----------|
| `before` | Snapshot is taken immediately before the action executes. Useful for capturing the current slide before the carousel advances. |
| `after` | Snapshot is taken immediately after the action completes. Useful for capturing an open dropdown, an expanded section, or a video mid-play frame. |

If omitted, the default is `after`.

### `data-vv-count`

An integer that causes the action to be repeated N times. A snapshot is taken
(at the `before`/`after` moment) for each repetition.

```html
<!-- Advance the carousel twice, snapshotting before each advance -->
<button
  data-vv-action="click"
  data-vv-count="2"
  data-vv-snapshot="before"
>
  Next →
</button>
```

This produces **2 additional PDF pages** (one snapshot per repetition) beyond
the initial page load.

### `data-vv-seq`

An integer string (`"1"`, `"2"`, `"3"`, …) that sets the order in which Hints
are executed on a given page. Lower numbers run first.

Without `data-vv-seq`, Hints are processed in DOM order, which can cause
parallel/simultaneous state changes (e.g., all accordion sections expanding at
once, or all tabs activating at the same time). By assigning distinct sequence
numbers you ensure each element is activated and captured one at a time:

```html
<!-- Tab switcher — activate each tab in sequence -->
<button data-vv-action="click" data-vv-seq="1">Web Apps</button>
<button data-vv-action="click" data-vv-seq="2">Mobile</button>
<button data-vv-action="click" data-vv-seq="3">Enterprise</button>

<!-- Accordion — expand each section in sequence -->
<button data-vv-action="click" data-vv-seq="1">FAQ: What is Web2PDF?</button>
<button data-vv-action="click" data-vv-seq="2">FAQ: How do Hints work?</button>
<button data-vv-action="click" data-vv-seq="3">FAQ: Which actions are supported?</button>
```

### `data-vv-fillvalue`

The string value the crawler types into a `fill`-Hinted field. Works on
`<input>`, `<textarea>`, and `<select>` elements.

```html
<!-- Text input -->
<input data-vv-action="fill" data-vv-fillvalue="Jane Smith" type="text" />

<!-- Select dropdown — crawler selects the matching option -->
<select data-vv-action="fill" data-vv-fillvalue="Pharmaceutical">
  <option>Pharmaceutical</option>
  <option>Biotech</option>
</select>
```

> **Note on casing:** React requires all `data-*` attributes to be fully
> lowercase. Always write `data-vv-fillvalue`, never `data-vv-fillValue`.

---

## Site Structure

```
web2pdf-demo/
├── app/
│   ├── layout.tsx            ← Root layout: shared Navbar + footer
│   ├── globals.css           ← Tailwind base + custom transitions
│   ├── not-found.tsx         ← Custom 404 error page
│   ├── sitemap.ts            ← Next.js sitemap (all 6 URLs exposed to crawler)
│   ├── page.tsx              ← Home: hero + Carousel + features
│   ├── solutions/
│   │   └── page.tsx          ← Solutions: Tab switcher + Video + Select dropdowns
│   ├── products/
│   │   └── page.tsx          ← Products: cards + Accordion FAQ
│   ├── contact/
│   │   └── page.tsx          ← Contact: form fill & submit
│   ├── thank-you/
│   │   └── page.tsx          ← Post-submit confirmation page
│   └── components/
│       ├── Navbar.tsx        ← Hover-dropdown nav   (hover)
│       ├── Carousel.tsx      ← Image carousel       (click + count + snapshot)
│       ├── TabSwitcher.tsx   ← Tab switcher         (click + seq)
│       ├── VideoPlayer.tsx   ← Video player         (click + snapshot)
│       ├── Accordion.tsx     ← FAQ accordion        (click + seq)
│       └── ContactForm.tsx   ← Contact form         (fill + fillSubmit)
└── README.md
```

---

## Pages & Hint Coverage

### Home — Hover Nav Dropdown

**File:** `app/components/Navbar.tsx`

```html
<button
  data-vv-action="hover"
  data-vv-snapshot="after"
>
  Products ▾
</button>
```

- `data-vv-action="hover"` — the crawler simulates a `mouseenter`, revealing
  the dropdown menu.
- `data-vv-snapshot="after"` — snapshot taken while the dropdown is open.

**Result:** 1 extra PDF page showing the open Products dropdown.

---

### Home — Image Carousel

**File:** `app/components/Carousel.tsx`

```html
<button
  data-vv-action="click"
  data-vv-count="2"
  data-vv-snapshot="before"
  aria-label="Next slide"
>
  →
</button>
```

- `data-vv-count="2"` — the click is repeated twice, advancing 2 slides.
- `data-vv-snapshot="before"` — snapshot taken before each advance captures
  the currently-visible slide.

**Result:** 2 extra PDF pages. Combined with the initial page load (slide 1
visible), all 3 slides are represented in the PDF.

---

### Solutions — Tab Switcher

**File:** `app/components/TabSwitcher.tsx`

```html
<button data-vv-action="click" data-vv-seq="1">Web Apps</button>
<button data-vv-action="click" data-vv-seq="2">Mobile</button>
<button data-vv-action="click" data-vv-seq="3">Enterprise</button>
```

- `data-vv-seq` ensures tabs are activated **one at a time** in a defined order,
  each producing a snapshot of its content panel.

**Result:** 3 extra PDF pages — one per tab panel.

---

### Solutions — Video Player

**File:** `app/components/VideoPlayer.tsx`

```html
<button
  data-vv-action="click"
  data-vv-snapshot="after"
  aria-label="Play video"
>
  ▶
</button>
```

- `data-vv-action="click"` — simulates pressing the play button.
- `data-vv-snapshot="after"` — snapshot taken **after** the click, capturing
  the video in its playing state (mid-play frame) rather than the poster image.

**Result:** 1 extra PDF page showing the video playing.

---

### Solutions — Select Dropdowns

**File:** `app/solutions/page.tsx`

```html
<!-- Industry select -->
<select
  data-vv-action="fill"
  data-vv-fillvalue="Pharmaceutical"
>
  <option>Pharmaceutical</option>
  <option>Medical Devices</option>
  ...
</select>

<!-- Volume select -->
<select
  data-vv-action="fill"
  data-vv-fillvalue="10,000 – 100,000"
>
  ...
</select>

<button data-vv-action="fillSubmit">Get My Custom Quote</button>
```

- `fill` on a `<select>` — the crawler picks the option whose text matches
  `data-vv-fillvalue` and dispatches a change event.
- `fillSubmit` — fills all sibling fill-Hinted fields then clicks the button.

**Result:** PDF captures the form with both dropdowns pre-selected.

---

### Products — Accordion FAQ

**File:** `app/components/Accordion.tsx`

```html
<!-- Dynamically rendered via .map() — seq value = faq.id -->
<button data-vv-action="click" data-vv-seq="1">What is Web2PDF?</button>
<button data-vv-action="click" data-vv-seq="2">How do Hints work?</button>
<button data-vv-action="click" data-vv-seq="3">Which actions are supported?</button>
<button data-vv-action="click" data-vv-seq="4">Can I capture multiple states?</button>
<button data-vv-action="click" data-vv-seq="5">Does it work with Next.js?</button>
```

- Each header is expanded and snapshotted individually in sequence order.

**Result:** 5 extra PDF pages — one per expanded FAQ section.

---

### Contact — Form Fill & Submit

**File:** `app/components/ContactForm.tsx`

```html
<input  data-vv-action="fill" data-vv-fillvalue="Jane Smith"            name="name"    />
<input  data-vv-action="fill" data-vv-fillvalue="jane.smith@pharma.com" name="email"   />
<input  data-vv-action="fill" data-vv-fillvalue="Acme Pharma"           name="company" />
<textarea
        data-vv-action="fill"
        data-vv-fillvalue="I'd like to learn more about integrating Web2PDF."
        name="message"
></textarea>

<button data-vv-action="fillSubmit" type="submit">Send Message</button>
```

- `fillSubmit` on the submit button fills all four fields then clicks, triggering
  the redirect to `/thank-you`.

**Result:** PDF includes the filled-in form state and the `/thank-you`
confirmation page (listed separately in the sitemap).

---

### 404 Error Page

**File:** `app/not-found.tsx`

This is Next.js's App Router custom 404 handler. It renders automatically
whenever a visitor navigates to a URL that doesn't match any route.

The page is also directly accessible at `/_not-found` — this path is listed
in `sitemap.ts` so Web2PDF can capture the error state as a standalone PDF page.

> Web2PDF must be configured to capture **non-200 responses** for the
> `/_not-found` entry to produce output.

---

## Sitemap & Crawler Discovery

**File:** `app/sitemap.ts`

Next.js generates `/sitemap.xml` automatically from this file. Submit that URL
to Web2PDF as the crawl entry point:

```
https://your-domain.com/sitemap.xml
```

### All registered URLs

| URL | Priority | Why included |
|-----|----------|-------------|
| `/` | 1.0 | Home — hover nav + carousel Hints |
| `/solutions` | 0.95 | Tab switcher + video + select dropdown Hints |
| `/products` | 0.9 | Accordion FAQ Hints |
| `/contact` | 0.7 | Form fill & fillSubmit Hints |
| `/thank-you` | 0.4 | Post-submit redirect target after fillSubmit |
| `/_not-found` | 0.1 | Next.js 404 handler — captures the error page state |

> `/thank-you` and `/_not-found` contain no Hints themselves — they are listed
> so the crawler captures those states as standalone PDF pages.

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install & run

```bash
cd web2pdf-demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

### Expose via ngrok (for Web2PDF testing)

```bash
# Terminal 1 — keep Next.js running
npm run dev

# Terminal 2 — expose publicly
ngrok http 3000
```

The ngrok URL (e.g. `https://abc123.ngrok-free.app`) can be submitted directly
to Web2PDF. The sitemap will be at:

```
https://abc123.ngrok-free.app/sitemap.xml
```

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | Public URL used to build absolute sitemap entries. Set to your deployed or ngrok domain. |

---

## Quick Reference — All Hint Attributes

| Element | File | `data-vv-action` | Supporting Hints |
|---------|------|-----------------|-----------------|
| Nav "Products" trigger | `Navbar.tsx` | `hover` | `data-vv-snapshot="after"` |
| Carousel "Next" button | `Carousel.tsx` | `click` | `data-vv-count="2"`, `data-vv-snapshot="before"` |
| Tab: Web Apps | `TabSwitcher.tsx` | `click` | `data-vv-seq="1"` |
| Tab: Mobile | `TabSwitcher.tsx` | `click` | `data-vv-seq="2"` |
| Tab: Enterprise | `TabSwitcher.tsx` | `click` | `data-vv-seq="3"` |
| Video play button | `VideoPlayer.tsx` | `click` | `data-vv-snapshot="after"` |
| Industry `<select>` | `solutions/page.tsx` | `fill` | `data-vv-fillvalue="Pharmaceutical"` |
| Volume `<select>` | `solutions/page.tsx` | `fill` | `data-vv-fillvalue="10,000 – 100,000"` |
| Solutions submit | `solutions/page.tsx` | `fillSubmit` | — |
| Accordion header 1–5 | `Accordion.tsx` | `click` | `data-vv-seq="1"` … `"5"` |
| Form: name input | `ContactForm.tsx` | `fill` | `data-vv-fillvalue="Jane Smith"` |
| Form: email input | `ContactForm.tsx` | `fill` | `data-vv-fillvalue="jane.smith@pharma.com"` |
| Form: company input | `ContactForm.tsx` | `fill` | `data-vv-fillvalue="Acme Pharma"` |
| Form: message textarea | `ContactForm.tsx` | `fill` | `data-vv-fillvalue="I'd like to learn more..."` |
| Form: submit button | `ContactForm.tsx` | `fillSubmit` | — |
