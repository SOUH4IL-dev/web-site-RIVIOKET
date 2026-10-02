# RIVIOKET — System Architecture

## 1. System Architecture Overview

**RIVIOKET** follows a clean, simplified full-stack architecture built on Next.js 14+ with React Server Components, Prisma ORM, PostgreSQL, Supabase Auth, and Supabase Storage.

```text
Next.js (App Router)
   ↓
Storefront / Admin UI
   ↓
Server Actions / Route Handlers
   ↓
Service Layer (Catalog, Cart, Checkout, Orders)
   ↓
Prisma ORM
   ↓
PostgreSQL Database

[Supabase Auth] ----> User Authentication & Sessions
[Supabase Storage] -> Product Media Assets
[Stripe API] --------> Payment Intent Processing
```

---

## 2. Directory Structure

```text
c:\Users\pc\Desktop\web site
├── docs/
│   ├── 01-PROJECT.md
│   ├── 02-ARCHITECTURE.md
│   ├── 03-DATABASE.md
│   ├── 04-FEATURES.md
│   └── 05-RULES.md
├── hichamstyle_com_1463w_default.h2d  # (Layout rhythm & UX reference)
├── public/
│   ├── favicon.ico
│   └── images/
├── prisma/
│   └── schema.prisma                  # Prisma data models & migrations
├── src/
│   ├── app/
│   │   ├── (storefront)/              # Customer Storefront routes
│   │   │   ├── page.tsx               # RIVIOKET Home
│   │   │   ├── catalog/
│   │   │   │   ├── page.tsx           # Product catalog
│   │   │   │   └── [category]/page.tsx
│   │   │   ├── product/
│   │   │   │   └── [slug]/page.tsx    # PDP
│   │   │   ├── cart/page.tsx
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx
│   │   │   │   └── success/page.tsx
│   │   │   └── account/
│   │   │       ├── page.tsx
│   │   │       └── orders/page.tsx
│   │   ├── (admin)/
│   │   │   └── admin/                 # Merchant Dashboard routes
│   │   │       ├── page.tsx           # Overview
│   │   │       ├── products/
│   │   │       ├── orders/
│   │   │       ├── customers/
│   │   │       ├── coupons/
│   │   │       └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── checkout/route.ts
│   │   │   └── webhooks/stripe/route.ts
│   │   ├── globals.css                # Tailwind CSS + RIVIOKET design tokens
│   │   └── layout.tsx                 # Root layout & font loading
│   ├── components/
│   │   ├── ui/                        # Tailwind primitives (Button, Modal, Input)
│   │   ├── storefront/                # Header, Footer, ProductCard, CartDrawer
│   │   └── admin/                     # Admin table, sidebar, stats cards
│   ├── lib/
│   │   ├── prisma.ts                  # Prisma Client singleton
│   │   ├── supabase/                  # Supabase Auth & Storage client setup
│   │   ├── stripe.ts                  # Stripe API initialization
│   │   └── validation/                # Zod schemas for forms and API bodies
│   ├── services/
│   │   ├── catalog.service.ts         # Products & Categories queries
│   │   ├── cart.service.ts            # Cart management logic
│   │   ├── checkout.service.ts        # Order & Stripe Checkout processing
│   │   └── order.service.ts           # Merchant order fulfillment
│   └── types/
│       └── index.ts                   # Shared TypeScript interfaces
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── .env.example
```

---

## 3. Data & Processing Flow

### 3.1 Authentication & User Session
1. Customer registers or logs in via Supabase Auth.
2. Supabase issues JWT access token stored in secure, SameSite HTTP-only cookies.
3. Server Components verify authentication state via `@supabase/ssr`.

### 3.2 Catalog & Product Detail Data Flow
1. User visits catalog or PDP.
2. Next.js Server Components fetch product records directly from PostgreSQL via Prisma.
3. Images are rendered using Supabase Storage public CDN URLs.

### 3.3 Cart & Checkout Flow
1. Cart additions execute via Server Actions (`src/services/cart.service.ts`).
2. Guest cart tracked via session cookie; registered user cart synced in `carts` table.
3. Checkout calls Stripe Payment Intent API.
4. Stripe Webhook notifies `/api/webhooks/stripe`, triggering idempotent status update to `PAID` in `orders` and stock reduction in `inventory`.

---

## 4. Key Architectural Decisions

* **ADR-001: Next.js + Tailwind CSS**: Chosen for fast development, zero-runtime CSS footprint, and precise implementation of RIVIOKET color tokens (`#0B0A08`, `#C9A96E`).
* **ADR-002: Prisma + PostgreSQL**: Declarative type-safe queries with automated migration management.
* **ADR-003: Supabase Auth & Storage**: Managed auth and asset storage, removing backend infrastructure overhead.
* **ADR-004: Server Actions for Business Logic**: All business operations encapsulated inside `src/services/` and invoked via Server Actions or API Route Handlers. UI components remain pure view layers.
