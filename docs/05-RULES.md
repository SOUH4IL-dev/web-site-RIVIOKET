# RIVIOKET — Engineering Rules & Source of Truth

This document defines the strict, non-negotiable architectural and engineering rules for **RIVIOKET**. All development must comply with these guidelines.

---

## 1. Coding & TypeScript Standards

* **Strict TypeScript**: TypeScript strict mode is enabled. Usage of `any` or `ts-ignore` is forbidden. Define explicit interfaces and types for all entities.
* **Component Responsibilities**: UI components in `src/components/` handle rendering ONLY. No direct database queries or external fetch calls inside components.
* **Service Abstraction**: Business logic must reside in `src/services/` and be called via Server Actions or Route Handlers.

---

## 2. UI/UX Design System Rules

* **Visual Rhythm**: Preserve the layout structure, spacing rhythm, and visual density of the `.h2d` layout snapshot.
* **Color Tokens**:
  * Dark Background: `#0B0A08`
  * Card / Surface Dark: `#14120F`
  * Border / Accent Dark: `#1B1814`
  * Primary Gold Accent: `#C9A96E`
  * Highlight Gold Accent: `#E6D2A5`
  * Off-White Text: `#F5F1E8`
* **Typography**:
  * Headings: `Cormorant Garamond` (Serif)
  * Body / UI: `Inter` (Sans-Serif)

---

## 3. Database & Financial Rules

* **Price Storage**: All financial prices must be stored as integer cents (`INT`) (e.g. $150.00 = `15000`). Floating-point money types are strictly prohibited.
* **Migration Enforcement**: Database schema changes must be applied strictly through **Prisma Migrate** (`npx prisma migrate dev`). Manual direct SQL edits on production are forbidden.
* **Order Snapshots**: Historical title, SKU, price, and addresses must be frozen in `order_items` and order address fields at checkout time.

---

## 4. API & Validation Rules

* **Server-Side Validation**: All incoming requests (Server Actions, Route Handlers) must validate payload schemas using Zod prior to processing.
* **Secret Management**: API keys (Stripe Secret Key, Supabase Service Role Key) must remain strictly on the server side and never be exposed in public environment variables or client bundles.

---

## 5. Security & Authorization

* **Supabase Authentication**: Sessions and tokens must be stored in secure HTTP-only cookies.
* **Admin Authorization**: All admin endpoints (`/admin/*`, `/api/admin/*`) must enforce role checks (`role === 'ADMIN'`). Unauthenticated or unauthorized attempts must return `401 Unauthorized` or `403 Forbidden`.

---

## 6. Implementation Principles

* **Read `/docs` First**: Before starting any implementation phase, review the corresponding documentation file.
* **Do Not Rewrite Working Architecture**: Preserve existing configuration and working code structure.
* **Phase Isolation**: Complete work strictly within designated phases without jumping ahead to future features.
