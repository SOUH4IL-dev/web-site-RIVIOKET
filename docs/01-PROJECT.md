# RIVIOKET — Project Specification

## 1. Project Goal
**RIVIOKET — Premium Jewelry & Fine Bijoux** is an ultra-luxury, high-performance e-commerce platform built to showcase and sell exquisite fine jewelry, premium gold chains, solitaire rings, artisan bracelets, diamond necklaces, luxury timepieces/watches, and fine bijoux.

The primary objective is to deliver a flagship digital storefront that pairs breathtaking visual aesthetics—inspired by the layout structure of the reference capture—with RIVIOKET branding, sub-second performance, reliable checkout, and an intuitive merchant back-office.

---

## 2. Business Concept & Positioning
* **Brand Name**: RIVIOKET
* **Tagline**: Premium Jewelry & Fine Bijoux
* **Product Catalog Scope**:
  * **Chains**: Gold, Platinum, & Silver chains (Cuban, Rope, Figaro, Tennis).
  * **Rings**: Engagement solitaire rings, wedding bands, gemstone rings.
  * **Bracelets**: Diamond tennis bracelets, gold cuffs, chain link bracelets.
  * **Necklaces**: Pendant necklaces, chokers, multi-layer gold chains.
  * **Watches**: Luxury timepieces, diamond bezel watches, precision movements.
  * **Bijoux**: Fine fashion jewelry, earrings, brooches.
* **Target Audience**: High-net-worth jewelry buyers, gift shoppers, timepiece collectors, and fine bijoux enthusiasts.

---

## 3. Definite Technology Stack

No alternative choices. Every layer has exactly one dedicated technology:

* **Framework**: Next.js 14+ (App Router, React 18/19)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Tailwind CSS
* **Database**: PostgreSQL
* **ORM**: Prisma ORM
* **Authentication**: Supabase Auth
* **Storage**: Supabase Storage
* **Payments**: Stripe (Credit / Debit Cards)

---

## 4. Visual Identity & Design Tokens

Inspired by the visual structure and layout rhythm of the `.h2d` workspace reference, elevated with RIVIOKET branding:

### Color Palette
* **Background Dark**: `#0B0A08`
* **Surface / Card Dark**: `#14120F`
* **Border / Overlay Dark**: `#1B1814`
* **Primary Gold Accent**: `#C9A96E`
* **Highlight Gold**: `#E6D2A5`
* **Text / Off-White**: `#F5F1E8`

### Typography
* **Headings**: `Cormorant Garamond` (Serif)
* **Body / UI Elements**: `Inter` (Sans-Serif)

---

## 5. Infrastructure & Deployment
* **App Hosting**: Vercel Edge Platform
* **Database & Auth Provider**: Supabase (Managed PostgreSQL & Supabase Auth)
* **Media Provider**: Supabase Storage (Buckets: `products`, `avatars`)
* **Payment Processor**: Stripe API

---

## 6. Major Business & Technical Requirements

1. **Performance**: LCP < 1.2s, CLS = 0, FID/INP < 50ms.
2. **Visual Experience**: Luxury dark aesthetic (`#0B0A08` + `#C9A96E`), clean mobile-first navigation, glassmorphic card overlays, responsive layout rhythm.
3. **Data Protection & Compliance**: PCI-DSS compliance via Stripe, secure HTTP-only cookies, Supabase RLS policies.
4. **Financial Safety**: All monetary values stored as integer minor units (cents) to avoid precision errors.
