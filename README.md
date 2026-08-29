# 🏨 DMC Glass Hotel — Premium Hotel Website

A fully functional, interactive luxury hotel website built with a **dark glassmorphism** design system. Premium, minimal, technical — designed for real-world client handoff.

![DMC Glass Hotel](https://img.shields.io/badge/DMC-Glass%20Hotel-22d3ee?style=for-the-badge&labelColor=0b1120&color=22d3ee)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&labelColor=0b1120)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&labelColor=0b1120)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06b6d4?style=for-the-badge&labelColor=0b1120)
![Convex](https://img.shields.io/badge/Convex-Backend-0b1120?style=for-the-badge&labelColor=0b1120&color=22d3ee)

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Pages & Routes](#-pages--routes)
- [Components Documentation](#-components-documentation)
- [Design System](#-design-system)
- [Customization Guide](#-customization-guide)
- [Deployment](#-deployment)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd dmc-glass-hotel

# Install dependencies
bun install

# Start development server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org) |
| **Bun** | 1.0+ | `curl -fsSL https://bun.sh/install \| bash` |
| **Convex CLI** | Latest | Installed automatically with project |

---

## 🔧 Installation

### Step 1: Clone & Install

```bash
git clone <your-repo-url>
cd dmc-glass-hotel
bun install
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the project root:

```env
VITE_CONVEX_URL=<your-convex-deployment-url>
```

> Get your Convex URL from the [Convex Dashboard](https://dashboard.convex.dev) after creating a project.

### Step 3: Initialize Convex Backend

```bash
bun convex dev --once
```

This generates the Convex schema, API types, and backend functions.

### Step 4: Start Development

```bash
bun run dev
```

The app runs at `http://localhost:5173`.

---

## 🏃 Running the Project

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Vite dev server with HMR |
| `bun tsc -b --noEmit` | Type-check without emitting files |
| `bun run build` | Production build (type-check + Vite bundle) |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format code with Prettier |
| `bun convex dev --once` | Push Convex schema/functions and generate types |

---

## 📁 Project Structure

```
dmc-glass-hotel/
├── public/                          # Static assets
│   ├── logo.svg
│   └── manifest.webmanifest
├── src/
│   ├── assets/                      # Images, SVGs
│   │   └── logo.svg
│   ├── components/
│   │   ├── hotel/                   # Hotel-specific components
│   │   │   ├── Navbar.tsx           # Fixed glassmorphism navigation bar
│   │   │   ├── Hero.tsx             # Full-screen parallax hero section
│   │   │   ├── RoomShowcase.tsx     # Room catalog with search & filter
│   │   │   ├── Amenities.tsx        # Hotel amenities grid
│   │   │   ├── Experience.tsx       # Signature experiences section
│   │   │   ├── Gallery.tsx          # Masonry image gallery
│   │   │   ├── Testimonials.tsx     # Auto-rotating guest reviews
│   │   │   ├── CTABanner.tsx        # Booking call-to-action banner
│   │   │   └── Footer.tsx           # Site footer with links
│   │   ├── ui/                      # Reusable UI primitives (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── ... (40+ components)
│   │   ├── LogoDropdown.tsx
│   │   └── RequireAuth.tsx          # Auth route guard
│   ├── convex/                      # Convex backend
│   │   ├── schema.ts                # Database schema definition
│   │   ├── auth.ts                  # Authentication functions
│   │   ├── auth.config.ts           # Auth configuration
│   │   ├── http.ts                  # HTTP routes
│   │   ├── users.ts                 # User queries/mutations
│   │   └── _generated/              # Auto-generated types & API
│   ├── hooks/
│   │   ├── use-auth.ts              # Authentication hook
│   │   └── use-mobile.ts            # Mobile detection hook
│   ├── lib/
│   │   └── utils.ts                 # Utility functions (cn, etc.)
│   ├── pages/
│   │   ├── Landing.tsx              # Homepage (all sections composed)
│   │   ├── Auth.tsx                 # Sign up / Sign in page
│   │   ├── Dashboard.tsx            # User dashboard (bookings, reviews, messages, profile)
│   │   ├── Admin.tsx                # Admin panel (stats, room mgmt, bookings table)
│   │   ├── RoomDetail.tsx           # Individual room detail page
│   │   ├── BookingPage.tsx          # Date selection & booking flow
│   │   ├── CheckoutPage.tsx         # Payment & checkout
│   │   └── NotFound.tsx             # 404 page
│   ├── index.css                    # Global styles, glassmorphism utilities, theme tokens
│   ├── main.tsx                     # App entrypoint, router, providers
│   └── vite-env.d.ts
├── index.html                       # HTML entrypoint
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── components.json                  # shadcn/ui config
└── README.md
```

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 19 | UI library |
| **Language** | TypeScript 5.9 | Type safety |
| **Styling** | Tailwind CSS 4.1 | Utility-first CSS |
| **Components** | shadcn/ui + Radix UI | Accessible, composable components |
| **Animation** | Framer Motion 12 | Page transitions, scroll effects, hover states |
| **Icons** | Lucide React | Consistent icon set |
| **Routing** | React Router 7 | Client-side routing |
| **Backend** | Convex | Database, auth, serverless functions |
| **Auth** | Convex Auth | Email OTP + anonymous sign-in |
| **Build** | Vite 7 | Dev server & bundler |
| **Package Manager** | Bun | Fast installs & scripts |

---

## 🏗 Architecture Overview

### Data Flow

```
User Interaction
       ↓
  React Component (pages/ or components/hotel/)
       ↓
  Convex Query/Mutation (src/convex/)
       ↓
  Convex Database (cloud-hosted)
       ↓
  Reactive UI Update (automatic via Convex subscriptions)
```

### Auth Flow

```
1. User visits /auth
2. Enters email → Convex Auth sends OTP code
3. User enters code → Convex verifies & creates session
4. Redirect to /dashboard (or saved returnTo path)
5. RequireAuth component guards protected routes
```

### Route Protection

```
/ (Landing)         → Public
/auth                → Public (redirects to dashboard if already signed in)
/rooms/:id           → Public
/dashboard           → Protected (RequireAuth)
/booking/:id         → Protected (RequireAuth)
/checkout/:id        → Protected (RequireAuth)
/admin               → Protected (RequireAuth)
```

---

## 📄 Pages & Routes

### `/` — Landing Page
The homepage composes all sections in order:
1. **Navbar** — Fixed glassmorphism nav with smooth-scroll links and mobile menu
2. **Hero** — Full-screen parallax background, animated headline, stats, CTAs
3. **Room Showcase** — Searchable/filterable room catalog with 4 room types
4. **Amenities** — 6 amenity cards (pool, dining, wellness, spa, wine cellar, concierge)
5. **Experience** — 3 alternating image+text cards for signature experiences
6. **Gallery** — Masonry image grid with hover zoom overlays
7. **Testimonials** — Auto-rotating guest reviews with dot navigation
8. **CTA Banner** — Parallax booking call-to-action
9. **Footer** — Brand, links, contact info, social icons

### `/auth` — Authentication
- Email + password sign-in
- OTP verification step
- Guest (anonymous) sign-in option
- Redirects authenticated users to dashboard

### `/rooms/:id` — Room Detail
- Full hero image with parallax
- Room description, features, amenities list, photo gallery
- Sticky sidebar with live pricing calculator and "Book This Room" CTA

### `/booking/:id` — Booking
- Interactive calendar with check-in/check-out date selection
- Guest count selector
- Live price calculation (nights × rate + taxes)
- Continues to checkout

### `/checkout/:id` — Checkout
- Guest information form
- Credit card payment form (simulated)
- Order summary sidebar
- Processing animation → success confirmation with booking reference

### `/dashboard` — User Dashboard
- **Overview** tab: Quick action cards + upcoming reservation
- **Bookings** tab: All reservations with status badges
- **Reviews** tab: Write reviews with star rating + photo upload
- **Messages** tab: Concierge messaging interface
- **Profile** tab: Edit personal information

### `/admin` — Admin Panel
- **Overview** tab: Key metrics (bookings, revenue, occupancy, satisfaction) + recent bookings table
- **Rooms** tab: Room management with search, status badges, edit/delete actions
- **Bookings** tab: Full bookings table with all details and actions

---

## 🧩 Components Documentation

### `<Navbar />`
Fixed glassmorphism navigation bar. Shows glass effect on scroll. Includes smooth-scroll nav links, phone CTA, "Book Now" button, and responsive mobile menu with animated slide-in.

**Props:** None (self-contained)

### `<Hero />`
Full-viewport hero with parallax background image. Uses Framer Motion `useScroll` and `useTransform` for parallax. Animated badge, heading, description, stats, and dual CTAs. Scroll indicator at bottom.

**Props:** None

### `<RoomShowcase />`
Room catalog with integrated search and category filter. Renders `RoomCard` sub-components with hover zoom, glass badges, feature tags, and "View Details" CTAs. Supports "All", "Suite", "Penthouse", "Deluxe", "Presidential" filters.

**State:** `search` (string), `activeCategory` (string)

### `<Amenities />`
Grid of 6 amenity cards with icon, title, description. Hover effects include glow and lift. Uses intersection observer for staggered reveal animations.

**Props:** None

### `<Experience />`
Alternating left/right layout cards for signature experiences. Each card has an image with hover zoom, overlay gradient, quote icon, title, description, and "Learn More" CTA. Parallax background.

**Props:** None

### `<Gallery />`
Masonry-style image grid with hover overlay. Zoom icon and caption appear on hover. Staggered entrance animations.

**Props:** None

### `<Testimonials />`
Auto-rotating testimonial carousel. Auto-advances every 6 seconds. Includes star ratings, author avatars, quote icon, and dot navigation with prev/next buttons.

**Props:** None

### `<CTABanner />`
Parallax background banner with booking CTA. Two buttons: "Reserve Your Suite" and phone number. Trust signals at bottom.

**Props:** None

### `<Footer />`
Full site footer with brand logo, description, contact info, three link columns (Hotel, Services, Support), social icons, and back-to-top button. Dark glass card.

**Props:** None

### `<RequireAuth />`
Route guard component. Shows loading spinner while auth state resolves. Redirects unauthenticated users to `/auth?returnTo=<current-path>`. Renders children when authenticated.

**Props:** `{ children: ReactNode }`

---

## 🎨 Design System

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--dmc-cyan` | `#22d3ee` | Primary accent, CTAs, links, highlights |
| `--dmc-cyan-dim` | `#0e7490` | Darker cyan for gradients |
| `--dmc-gold` | `#c9a96e` | Secondary accent, stars, badges |
| `--dmc-gold-light` | `#dfc79a` | Lighter gold for gradients |
| `--dmc-surface` | `#111827` | Card/panel backgrounds |
| `--dmc-surface-2` | `#1f2937` | Elevated surfaces |
| `--dmc-text` | `#f1f5f9` | Primary text |
| `--dmc-text-dim` | `#94a3b8` | Secondary text |
| `--dmc-text-muted` | `#64748b` | Muted/placeholder text |
| Background | `#0b1120` | Page background |

### Glass Utility Classes

| Class | Description |
|-------|-------------|
| `.glass` | Standard glass panel: 6% white bg, 20px blur, 10% border |
| `.glass-strong` | Stronger glass: 10% white bg, 28px blur, 18% border, inset highlight |
| `.glass-subtle` | Subtle glass: 4% white bg, 12px blur, 6% border |

### Text Gradient Classes

| Class | Description |
|-------|-------------|
| `.text-gradient-cyan` | Cyan gradient text for headings |
| `.text-gradient-gold` | Gold gradient text for luxury accents |

### Animation Utilities

| Class | Description |
|-------|-------------|
| `.animate-float` | 6s infinite float (translateY) |
| `.animate-float-delayed` | Same float with 2s delay |
| `.animate-glow` | 3s infinite glow box-shadow pulse |

---

## ✏️ Customization Guide

### Change Hotel Name

Search and replace across all files:
- `DMC Glass Hotel` → Your hotel name
- `DMC.` → Your logo text
- `Glass Hotel` → Your subtitle
- Update `index.html` `<title>` tag

### Change Colors

Edit `src/index.css` CSS custom properties:
```css
:root {
  --dmc-cyan: #22d3ee;     /* Change primary accent */
  --dmc-gold: #c9a96e;     /* Change secondary accent */
  --background: #0b1120;   /* Change page background */
}
```

Also update the corresponding `@theme inline` values in the same file.

### Change Rooms

Edit the `rooms` array in `src/components/hotel/RoomShowcase.tsx` and `roomData` in `src/pages/RoomDetail.tsx`.

### Change Images

Replace Unsplash URLs in component files. All images use `unsplash.com` direct links with `?w=` quality parameters. For production, replace with your own hosted images.

### Add New Pages

1. Create the page in `src/pages/YourPage.tsx`
2. Add a lazy import in `src/main.tsx`
3. Add a `<Route>` inside the `<Routes>` block
4. Wrap with `<RequireAuth>` if it needs authentication

### Add New Sections to Landing

1. Create the component in `src/components/hotel/`
2. Import and add it to `src/pages/Landing.tsx`

---

## 🚀 Deployment

### Vercel

```bash
bun run build
# Deploy the dist/ folder to Vercel
```

### Netlify

```bash
bun run build
# Deploy the dist/ folder to Netlify
# Set SPA redirect: /* → /index.html
```

### Convex Backend

```bash
bun convex deploy
```

Make sure to set `VITE_CONVEX_URL` in your deployment platform's environment variables.

---

## 📝 License

This project is proprietary. Built for client delivery.

---

## 🙏 Credits

- **Images:** [Unsplash](https://unsplash.com) (free license)
- **Icons:** [Lucide](https://lucide.dev)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Animations:** [Framer Motion](https://www.framer.com/motion)
- **Platform:** Built on [Freebuff](https://freebuff.com)
