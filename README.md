# ShieldDrive Insurance

A high-performance auto insurance lead-generation landing page built with Next.js 14 App Router. Users select their vehicle from cascading Year → Make → Model dropdowns backed by a real PostgreSQL database, fill out a contact form, and submit their lead — all with client-side and server-side validation. The project targets Core Web Vitals scores of LCP ≤ 2.5 s, CLS ≤ 0.1, and a Lighthouse performance score ≥ 90.

---

## Tech Stack

- **Framework** — Next.js 14 (App Router, Server Components, Route Handlers)
- **Language** — TypeScript 5
- **Styling** — Tailwind CSS v3 + shadcn/ui v4 components
- **ORM** — Prisma 7 with `@prisma/adapter-neon` (serverless driver)
- **Database** — PostgreSQL on [Neon](https://neon.tech) (free tier)
- **Form handling** — react-hook-form v7 + @hookform/resolvers v5
- **Validation** — Zod v4 (shared schema used on client and server)
- **Icons** — lucide-react

---

## Prerequisites

| Requirement | Minimum version |
|---|---|
| Node.js | 18.17.0 (LTS) |
| npm | 9 |
| PostgreSQL database | Neon free tier or any PostgreSQL 14+ instance |

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd shielddrive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your database connection string:

```bash
cp .env.example .env
```

Open `.env` and set `DATABASE_URL` to your Neon (or any PostgreSQL) connection string. See the [Environment Variables](#environment-variables) section below.

### 4. Run the database migration

Creates the `Vehicle` and `Lead` tables:

```bash
npx prisma migrate dev --name init
```

### 5. Seed the vehicle data

Inserts 1,296 vehicle records (model years 2010–2024, 18 makes, 4–5 models each):

```bash
npx prisma db seed
```

To verify the data was inserted correctly:

```bash
npx prisma studio
```

Navigate to the `Vehicle` table — you should see 1,296 rows.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description | Example value |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string with SSL. Obtain from the Neon dashboard under **Connection Details → Connection string**. | `postgresql://user:pass@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require` |

The connection string is used exclusively server-side (Route Handlers and Prisma). It is never exposed to the browser.

---

## How Vehicle Seed Data Was Generated

The seed data lives in [`prisma/data/vehicles.json`](prisma/data/vehicles.json) — 1,296 entries covering model years 2010–2024 for 18 car makes with 4–5 models each.

### Prompt used to generate the data

> Generate a JSON array of vehicle records for a seed file. Each record should have three fields: `year` (integer), `make` (string), and `model` (string). Include model years from 2010 to 2024 (inclusive). Include these 18 makes: Toyota, Honda, Ford, Chevrolet, Nissan, Hyundai, Kia, Jeep, Ram, GMC, Subaru, Volkswagen, BMW, Mercedes-Benz, Audi, Tesla, Mazda, Dodge. For each make, include 4–5 of their most popular real-world models for each year. Tesla should start from 2012 (Model S debut). Output only the raw JSON array with no explanation.

The resulting array was saved to `prisma/data/vehicles.json` and is imported by the seed script.

### Running the seed

[`prisma/seed.ts`](prisma/seed.ts) reads the JSON file and uses `createMany` with `skipDuplicates: true` for an idempotent, single-round-trip insert:

```bash
# Run via npm script (calls ts-node internally)
npx prisma db seed

# Or run directly with ts-node
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

Re-running the seed is safe — duplicate rows are silently skipped.

---

## Running a Production Build

```bash
npm run build   # Compiles and optimises the app
npm run start   # Starts the production server on port 3000
```

Check the build output for per-route JS bundle sizes. The target for first-load JS is ≤ 150 KB per route.

---

## Trade-offs & Decisions

**Native `<select>` over shadcn/ui Select.** shadcn/ui v4 ships its Select component via `@base-ui/react`, which added ~43 KB to the first-load bundle and pushed the route over the 150 KB target. Switching to native `<select>` elements with custom Tailwind styling brought the bundle to ~137 KB while preserving full keyboard and screen reader support — a worthwhile trade given that native selects are accessible and well-supported across all browsers.

**Prisma 7 with the Neon serverless adapter.** Prisma 7 is a major release that relocates datasource URL configuration from `schema.prisma` to a separate `prisma/prisma.config.ts` file. This required extra setup compared to Prisma 5/6 tutorials, but using the official `@prisma/adapter-neon` driver ensures connection pooling works correctly in Next.js serverless functions without exhausting Neon's connection limits.

**Zod v4 for shared validation.** The same `leadSchema` is imported by both the React form (client) and the `/api/leads` Route Handler (server), so a submission can only succeed if it passes identical rules on both sides. Zod v4 introduced breaking changes to `.email()` and its error shape, which required aligning to `@hookform/resolvers` v5 — the first release with Zod v4 support.

**`React.forwardRef` on the Input component.** react-hook-form registers fields by attaching a `ref` callback to the underlying DOM element. Without `forwardRef`, the ref cannot reach the `<input>` and every field value is `undefined` at submit time, causing all validations to fail silently. Wrapping the Input component in `React.forwardRef` was the critical fix that unblocked form submission entirely.

**CLS prevention with fixed-height containers.** The cascading dropdowns load options asynchronously, which would normally cause layout shifts as the lists expand. Each select wrapper uses `min-h-[44px] h-10` and each inline error paragraph uses `min-h-[16px]` so the space is reserved before content arrives, keeping CLS well below the 0.1 threshold.

**`createMany` with `skipDuplicates` for seeding.** The initial approach used individual upserts for each of the 1,296 rows, which was slow and easily interrupted mid-run. Replacing it with a single `createMany` call completes in under a second and is idempotent — re-running it never produces duplicate data.

**What would be improved with more time.** Native `<select>` elements cannot be fully styled in Safari — a custom headless combobox (Radix UI Primitive or Downshift) would give consistent cross-browser appearance. The vehicle API routes set `Cache-Control: public, max-age=86400` at the HTTP level, but adding Redis or Next.js `unstable_cache` would eliminate the database round-trip entirely on repeated requests. Finally, end-to-end tests with Playwright would make the cascading dropdown behaviour and form submission path regression-safe before any production deployment.
