# RIVIOKET — Feature Scope & Roadmap

## 1. MVP Features Scope

The initial Minimum Viable Product (MVP) includes only core features required to operate a professional e-commerce store for RIVIOKET:

### 1.1 Storefront & Presentation
* **Homepage**: High-impact luxury hero section, featured collection grids (Chains, Rings, Bracelets, Necklaces, Watches, Bijoux), brand statement.
* **Category Navigation**: Hierarchical navigation tree for core jewelry lines.
* **Product Listing Page (PLP)**: Product grid with image thumbnails, price display, category filter, and sorting.
* **Product Detail Page (PDP)**: Product title, image gallery, variant selector (size, metal, watch case size), price, stock status, "Add to Cart" button.

### 1.2 Cart & Checkout
* **Slide-Out Cart Drawer**: Fast slide-out cart displaying line items, quantities, subtotal, and direct checkout trigger.
* **Checkout Flow**: Guest and registered user checkout with address input, shipping selection, tax calculation, and integrated Stripe Card payment.

### 1.3 Catalog & Inventory Management
* **Products & Categories**: Full admin CRUD management for categories, product details, and image uploads via Supabase Storage.
* **Product Variants**: Attribute-based variants (SKU, size option, price adjustment).
* **Inventory Tracking**: Stock quantity management per variant with auto-deduction upon payment.

### 1.4 Customer & Order Management
* **Customer Accounts**: User signup, login, password reset via Supabase Auth, and profile/address book management.
* **Order Processing**: Customer order history view; Admin order queue with status transitions (`PENDING` -> `PROCESSING` -> `PAID` -> `SHIPPED` -> `DELIVERED`).

### 1.5 Admin Dashboard & Store Configuration
* **Dashboard Overview**: Key business indicators (total revenue, order count, total customers).
* **Basic Coupons**: Discount promo code application (percentage or fixed amount).
* **Store Settings**: Basic store details, currency default, tax rate, notification banner text.

### 1.6 SEO Basics
* Dynamic metadata title and description tags for all pages.
* Clean canonical URLs and basic OpenGraph image tags.

---

## 2. Future Features Scope (Post-MVP Roadmap)

The following advanced features are explicitly deferred to future releases and are **NOT** part of MVP requirements:

* **Interactive 360° Media & Video**: 360-degree product rotation views and HD video loops.
* **Custom Engraving**: Live font visualizer for custom text engraved inside rings and watch case backs.
* **Authenticity Certificates**: Automated PDF generation for GIA/HRD certificates and digital authenticity passports.
* **Advanced CRM & VIP Portal**: Customer tiering, lifetime spend tracking, concierge booking.
* **Customer Reviews & Ratings**: Verified buyer reviews with star ratings and photo uploads.
* **Wishlist**: Saved items list and shareable wishlist links.
* **Multi-Currency System**: Real-time currency conversion selector (EUR, USD, MAD, AED, GBP).
* **Multilingual System**: Multi-language translation engine (English, French, Arabic RTL).
* **Advanced Analytics**: PostHog conversion funnel recordings and Google Analytics 4 Enhanced E-Commerce.
* **Advanced Shipping Integrations**: Live API integration with DHL Express / FedEx for dynamic rate calculation.
* **Additional Payment Providers**: PayPal Commerce Platform, Klarna/Afterpay Buy Now Pay Later (BNPL).
* **Advanced Personalization**: AI-driven product recommendations and custom ring size fit quizzes.
