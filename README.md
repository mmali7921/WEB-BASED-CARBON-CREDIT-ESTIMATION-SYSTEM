# Web-Based Carbon Credit Estimation System

A full-stack web application designed to calculate carbon emissions, track reduction activities, and determine carbon credit surplus or deficit through a structured dashboard interface.

This project demonstrates modern web development practices combined with sustainability-focused data modeling.

---

## Overview

The Web-Based Carbon Credit Estimation System enables users to:

- Record energy and fuel consumption data  
- Track carbon reduction activities  
- Calculate gross carbon emissions  
- Compute total emission reductions  
- Determine net carbon footprint  
- Estimate carbon credit surplus or deficit  

The system converts environmental usage data into structured carbon accounting insights.

---

## Key Features

### Emission Tracking
- Electricity consumption (kWh)
- Petrol consumption (liters)
- Diesel consumption (liters)
- LPG consumption (kg)

### Reduction Tracking
- Solar energy generation
- Trees planted
- CO₂ captured (Direct Air Capture / Carbon Capture Systems)

### Carbon Calculations
- Gross emissions calculation  
- Total reductions computation  
- Net emissions analysis  
- Carbon credit estimation  

> 1 Carbon Credit = 1000 kg CO₂

### User Interface
- Structured dashboard layout  
- Card-based design  
- Responsive architecture  
- Light and dark theme support  

---

## Technology Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend
- API Routes / Server Actions
- Prisma ORM
- PostgreSQL (via Prisma)

---

## System Workflow

1. User inputs emission-related data.
2. The system applies predefined emission factors.
3. Reduction activities are calculated.
4. Net emissions are determined.
5. Carbon credit position is computed.
6. Results are displayed through dashboard metrics.

---

## Project Structure
```
/app
/components
/lib
/prisma
/public
```

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/mmali7921/WEB-BASED-CARBON-CREDIT-ESTIMATION-SYSTEM.git
cd WEB-BASED-CARBON-CREDIT-ESTIMATION-SYSTEM
```

Install Dependencies
```bash
npm install
```


Configure Environment Variables

Create a `.env` file in the root directory and set the following (example values shown; replace with your own):

```bash
# PostgreSQL database used by Prisma
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth (Auth.js) configuration
AUTH_SECRET="a-long-random-secret-string"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"
```

After setting these, generate and apply Prisma migrations against your database:

```bash
npx prisma migrate dev
```

Run Development Server
```bash
npm run dev
```
Access the application at:
```code
http://localhost:3000
```

Development Team

N Hashim Iqbal
Founder and Research Lead

Muhammed Ali
Lead Engineer and System Architect


