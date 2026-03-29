# Web-Based Carbon Credit Estimation System

<div align="center">

![carbo – Measure Your Carbon Footprint](docs/screenshots/home.png)

**A full-stack web application for carbon emissions tracking and carbon credit estimation.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-carbo--three.vercel.app-black?style=flat-square)](https://carbo-three.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma%20ORM-336791?style=flat-square&logo=postgresql)](https://www.prisma.io/)

</div>

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Project Overview](#project-overview)
3. [Key Features](#key-features)
4. [Tools & Technologies](#tools--technologies)
5. [System Architecture](#system-architecture)
6. [Installation & Setup](#installation--setup)
7. [Execution Procedure](#execution-procedure)
8. [Output Screenshots](#output-screenshots)
9. [Carbon Credit Formula](#carbon-credit-formula)
10. [Project Structure](#project-structure)
11. [Development Team](#development-team)
12. [Conclusion](#conclusion)

---

## Problem Statement

Carbon emissions from human activities — energy consumption, transportation, and fuel usage — are a leading driver of climate change. Despite growing awareness, most individuals and small organizations lack accessible, easy-to-use tools to accurately measure their carbon footprint or understand how many **carbon credits** they need to offset their emissions.

Existing solutions are often:
- Too complex for non-specialists
- Expensive or enterprise-only
- Not focused on educational and awareness use cases

This project addresses that gap by providing a **web-based carbon credit estimation system** that enables users to:
- Input their energy and fuel consumption data
- Automatically compute their carbon emissions using standardized conversion factors
- Visualize their carbon footprint over time through a personal dashboard
- Understand how many carbon credits are needed to offset their impact

The system is designed for **educational and preliminary environmental assessment** purposes.

---

## Project Overview

**Carbo** is a full-stack Next.js web application that accepts user-provided energy and travel data, applies internationally-recognized emission factors, and produces a carbon credit estimate. Users authenticate via Google OAuth, and their historical entries are stored securely in a PostgreSQL database.

### How It Works

```
User Input (kWh / km) → Emission Factors → CO₂ Calculation → Carbon Credit Estimate → Dashboard
```

1. The user enters energy usage (kWh) and travel distance (km)
2. The server applies the appropriate emission factor for each source
3. Total CO₂ equivalent (kg) is computed
4. The result is saved to the database and displayed on the dashboard
5. Carbon credits are estimated at the rate of **1 credit = 1,000 kg CO₂**

---

## Key Features

| Feature | Description |
|---|---|
| 🔐 **Google OAuth** | Secure, one-click sign-in via Google (Auth.js v5) |
| 🧮 **Carbon Calculator** | Enter energy & travel data; get instant CO₂ output |
| 📊 **Personal Dashboard** | View historical entries sorted by date |
| 📋 **Emission Factors Page** | Browse all standardized conversion rates used |
| 🌗 **Light / Dark Mode** | Toggle between themes with next-themes |
| 🔒 **Protected Routes** | Dashboard and calculator require authentication |
| ☁️ **Cloud Deployed** | Hosted on Vercel; database on managed PostgreSQL |

---

## Tools & Technologies

### Frontend
| Tool | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework with server components & server actions |
| **React 19** | UI library |
| **TypeScript 5** | Static typing across the entire codebase |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **shadcn/ui + Radix UI** | Accessible, headless UI component library |
| **Recharts** | Data visualization for dashboard charts |
| **Lucide React** | Icon set |
| **next-themes** | Light/dark theme management |

### Backend & Data
| Tool | Purpose |
|---|---|
| **Next.js Server Actions** | Type-safe server-side mutations (no separate REST API) |
| **Auth.js (next-auth v5)** | Authentication with Google OAuth 2.0 provider |
| **Prisma ORM 6** | Database schema management and type-safe queries |
| **PostgreSQL** | Relational database for users and carbon entries |
| **@auth/prisma-adapter** | Links Auth.js sessions to the Prisma User model |

### Deployment & Tooling
| Tool | Purpose |
|---|---|
| **Vercel** | Cloud hosting with automatic CI/CD from GitHub |
| **Vercel Analytics** | Page-view and performance monitoring |
| **pnpm** | Fast, disk-efficient package manager |
| **Zod** | Runtime schema validation for forms |
| **React Hook Form** | Performant form state management |

---

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
│   Landing Page → Login → Calculator → Dashboard          │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS
┌────────────────────▼─────────────────────────────────────┐
│                   Next.js App (Vercel)                    │
│  ┌─────────────┐  ┌───────────────┐  ┌────────────────┐  │
│  │  App Router │  │ Server Actions│  │  Auth.js (JWT) │  │
│  │  (RSC + CSR)│  │ carbon.ts     │  │  Google OAuth  │  │
│  └─────────────┘  └───────┬───────┘  └────────────────┘  │
└──────────────────────────┬───────────────────────────────┘
                           │ Prisma ORM
┌──────────────────────────▼───────────────────────────────┐
│              PostgreSQL Database                          │
│   Users · Accounts · Sessions · CarbonEntries            │
└──────────────────────────────────────────────────────────┘
```

### Database Models

- **User** — stores profile info linked to OAuth provider
- **Account / Session** — managed by Auth.js adapter
- **CarbonEntry** — `energyUsage (kWh)`, `distance (km)`, `totalCarbon (kg CO₂)`, `date`

---

## Installation & Setup

### Prerequisites

- **Node.js** ≥ 18.x
- **pnpm** ≥ 8.x ( `npm install -g pnpm` )
- A **PostgreSQL** database (local or hosted, e.g. Supabase / Neon / Railway)
- A **Google OAuth 2.0** Client ID & Secret from [Google Cloud Console](https://console.cloud.google.com/)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/mmali7921/WEB-BASED-CARBON-CREDIT-ESTIMATION-SYSTEM.git
cd WEB-BASED-CARBON-CREDIT-ESTIMATION-SYSTEM
```

### Step 2 — Install Dependencies

```bash
pnpm install
```

> Alternatively with npm: `npm install`

### Step 3 — Configure Environment Variables

Create a `.env` file in the project root:

```env
# ── Database ──────────────────────────────────────────────
# PostgreSQL connection string (used by Prisma via connection pooler)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pgbouncer=true"

# Direct connection (used for Prisma migrations)
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# ── Authentication (Auth.js) ───────────────────────────────
# Generate with: openssl rand -base64 32
AUTH_SECRET="your-random-secret-string"

# Google OAuth credentials from Google Cloud Console
AUTH_GOOGLE_ID="your-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

> **Google OAuth setup:** In the [Google Cloud Console](https://console.cloud.google.com/), add `http://localhost:3000/api/auth/callback/google` as an Authorized Redirect URI for local development.

### Step 4 — Set Up the Database

Apply the Prisma schema to your database:

```bash
npx prisma migrate dev --name init
```

This creates all required tables (`User`, `Account`, `Session`, `VerificationToken`, `CarbonEntry`).

To view/edit data in a GUI:

```bash
npx prisma studio
```

---

## Execution Procedure

### Development Server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Typical User Flow

| Step | Action | URL |
|---|---|---|
| 1 | Visit the landing page | `/` |
| 2 | Click **Sign In** and continue with Google | `/login` |
| 3 | Enter energy usage (kWh) & distance (km) | `/calculator` |
| 4 | Submit the form — result is saved to the database | `/calculator` |
| 5 | View all past entries and carbon credit summary | `/dashboard` |
| 6 | Browse the emission conversion factors used | `/emission-factors` |

### Production Build (optional)

```bash
pnpm build
pnpm start
```

### Useful Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server with hot-reload |
| `pnpm build` | Compile for production |
| `pnpm start` | Run production server |
| `pnpm lint` | Run ESLint |
| `npx prisma migrate dev` | Apply schema changes to the database |
| `npx prisma studio` | Open database GUI |
| `npx prisma db seed` | Seed the database with sample data |

---

## Output Screenshots

### 1. Landing Page

The public-facing home page introduces the application and links to the calculator.

![Home Page – Measure Your Carbon Footprint Simply](docs/screenshots/home.png)

---

### 2. Sign In Page

Users authenticate with a single click via Google OAuth. No passwords are stored.

![Sign In Page – Google OAuth](docs/screenshots/login.png)

---

### 3. Emission Factors Reference

All CO₂ conversion factors used in calculations are documented and publicly accessible.

![Emission Factors Page](docs/screenshots/emission-factors.png)

---

### 4. Carbon Credit Calculator

Authenticated users can enter electricity (kWh), fuel (petrol, diesel, LPG, natural gas), air travel and emission reduction data (solar, trees planted, CO₂ captured) to run a full assessment.

![Carbon Credit Calculator – Input Form](docs/screenshots/calculator.png)

---

### 5. Personal Dashboard

The dashboard displays the monthly environmental assessment — gross emissions, reductions, net emissions, carbon credits, and a breakdown by activity, along with a history of all past calculations.

![Dashboard – Environmental Assessment Overview](docs/screenshots/dashboard.png)

---

## Carbon Credit Formula

The system uses the following calculation pipeline:

```
Electricity Emissions  = energy_kWh × 0.233 kg CO₂/kWh
Travel Emissions       = distance_km × emission_factor kg CO₂/km
─────────────────────────────────────────────────────────
Total Carbon (kg CO₂)  = Electricity Emissions + Travel Emissions

Carbon Credits Needed  = Total Carbon (kg CO₂) ÷ 1,000
```

> **1 Carbon Credit = 1,000 kg CO₂** — aligned with voluntary carbon market standards.

Emission factors are sourced from internationally recognized environmental standards (e.g. IPCC, EPA) and are displayed on the [Emission Factors](https://carbo-three.vercel.app/emission-factors) page.

---

## Project Structure

```
WEB-BASED-CARBON-CREDIT-ESTIMATION-SYSTEM/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page
│   ├── layout.tsx              # Root layout (fonts, theme provider)
│   ├── globals.css             # Global styles
│   ├── calculator/             # Carbon calculator page (protected)
│   ├── dashboard/              # User dashboard with history (protected)
│   ├── emission-factors/       # Public emission factors reference
│   ├── login/                  # Sign-in page
│   ├── about/                  # About the project
│   ├── contact/                # Contact page
│   ├── privacy/                # Privacy policy
│   ├── terms/                  # Terms of service
│   ├── actions/
│   │   └── carbon.ts           # Server Actions: saveCarbonEntry, getCarbonEntries
│   └── api/
│       └── auth/[...nextauth]/ # Auth.js API route handler
├── components/                 # Reusable UI components (shadcn/ui based)
├── lib/
│   └── prisma.ts               # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeder
├── hooks/                      # Custom React hooks
├── styles/                     # Additional stylesheets
├── public/                     # Static assets (icons)
├── docs/
│   └── screenshots/            # Application screenshots for documentation
├── auth.ts                     # Auth.js configuration (providers, adapter)
├── auth.config.ts              # Auth.js base config (callbacks, pages)
├── middleware.ts               # Route protection middleware
├── next.config.mjs             # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## Development Team

| Name | Role |
|---|---|
| **N Hashim Iqbal** | Founder & Research Lead |
| **Muhammed Ali** | Lead Engineer & System Architect |

---

## Conclusion

The **Web-Based Carbon Credit Estimation System (Carbo)** successfully bridges the gap between complex environmental accounting and everyday accessibility. By combining a modern full-stack architecture (Next.js, Prisma, PostgreSQL) with a clean and minimal UI, the system makes it practical for individuals to:

- **Quantify** their carbon footprint from electricity and travel data
- **Track** their emissions over time through a secure, personalized dashboard
- **Understand** the carbon credit offset required to neutralize their impact

The project demonstrates how contemporary web technologies — server components, server actions, OAuth authentication, and ORM-managed databases — can be leveraged to build meaningful sustainability tools without sacrificing usability or performance.

Future improvements may include:
- Expanded emission source categories (flights, diet, manufacturing)
- Real-time carbon market credit pricing integration
- Organization-level multi-user accounts and reporting
- Export to PDF / CSV for formal carbon accounting

> **Live Application:** [https://carbo-three.vercel.app/](https://carbo-three.vercel.app/)  
> **Repository:** [https://github.com/mmali7921/WEB-BASED-CARBON-CREDIT-ESTIMATION-SYSTEM](https://github.com/mmali7921/WEB-BASED-CARBON-CREDIT-ESTIMATION-SYSTEM)
