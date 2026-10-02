# RIVIOKET — Database Schema & Data Architecture

## 1. Overview & Core Entities

The database for **RIVIOKET** is **PostgreSQL**, managed via **Prisma ORM**.

The database schema is streamlined around **15 core entities**:

1. `users` (Managed by Supabase Auth)
2. `profiles` (Extended user account details)
3. `addresses` (Customer shipping and billing addresses)
4. `categories` (Product category hierarchy)
5. `products` (Jewelry, watches, chains catalog items)
6. `product_images` (Product gallery media URLs)
7. `product_variants` (SKU, size, metal, watch case diameter)
8. `inventory` (Stock counts and reservations)
9. `carts` (Active shopping cart sessions)
10. `cart_items` (Cart line items)
11. `orders` (Purchased order headers)
12. `order_items` (Historical order line snapshots)
13. `payments` (Stripe transaction audit log)
14. `coupons` (Discount promo codes)
15. `store_settings` (Store configuration parameters)

---

## 2. Enums & Statuses

```sql
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'STAFF', 'ADMIN');

CREATE TYPE order_status AS ENUM ('PENDING', 'PROCESSING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');

CREATE TYPE payment_status AS ENUM ('UNPAID', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'REFUNDED');

CREATE TYPE coupon_type AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');
```

---

## 3. Schema Definitions

### 3.1 `users` & `profiles`
* `users` table is managed natively by Supabase Auth (`auth.users`).
* `profiles` extends user details:

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NULL,
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.2 `addresses`
```sql
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(50) DEFAULT 'Home',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255) NULL,
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100) NULL,
    postal_code VARCHAR(20) NOT NULL,
    country_code CHAR(2) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    is_default_shipping BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_addresses_profile ON addresses(profile_id);
```

### 3.3 `categories`
```sql
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NULL REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL, -- Chains, Rings, Bracelets, Necklaces, Watches, Bijoux
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT NULL,
    image_url TEXT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
```

### 3.4 `products` & `product_images`
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE NOT NULL,
    description TEXT NULL,
    base_price_cents INT NOT NULL, -- Price in integer cents
    compare_at_price_cents INT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255) NULL,
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
```

### 3.5 `product_variants` & `inventory`
```sql
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    variant_name VARCHAR(100) NOT NULL, -- e.g., "55 cm / 18k Yellow Gold"
    size_option VARCHAR(50) NULL,
    additional_price_cents INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID UNIQUE NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity_available INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_sku ON product_variants(sku);
```

### 3.6 `carts` & `cart_items`
```sql
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NULL REFERENCES profiles(id) ON DELETE CASCADE,
    session_token VARCHAR(255) NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, variant_id)
);

CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);
```

### 3.7 `orders` & `order_items`
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL, -- e.g. RVK-2026-88902
    profile_id UUID NULL REFERENCES profiles(id) ON DELETE SET NULL,
    customer_email VARCHAR(255) NOT NULL,
    status order_status NOT NULL DEFAULT 'PENDING',
    payment_status payment_status NOT NULL DEFAULT 'UNPAID',
    
    subtotal_cents INT NOT NULL,
    discount_cents INT NOT NULL DEFAULT 0,
    shipping_cents INT NOT NULL DEFAULT 0,
    total_cents INT NOT NULL,
    
    shipping_address_snapshot JSONB NOT NULL,
    billing_address_snapshot JSONB NOT NULL,
    
    coupon_id UUID NULL,
    tracking_number VARCHAR(100) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
    product_title VARCHAR(255) NOT NULL,
    variant_sku VARCHAR(100) NOT NULL,
    unit_price_cents INT NOT NULL,
    quantity INT NOT NULL,
    total_price_cents INT NOT NULL
);

CREATE INDEX idx_orders_profile ON orders(profile_id);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_order_items_order ON order_items(order_id);
```

### 3.8 `payments`, `coupons`, & `store_settings`
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    transaction_id VARCHAR(255) NOT NULL,
    amount_cents INT NOT NULL,
    status payment_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    type coupon_type NOT NULL DEFAULT 'PERCENTAGE',
    discount_value INT NOT NULL, -- E.g., 10 for 10% or 1500 for $15.00
    min_order_cents INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE store_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Price & Inventory Handling Rules

* **Financial Amounts**: Stored strictly as integer cents (`INT`) in `base_price_cents`, `subtotal_cents`, `discount_cents`, `shipping_cents`, and `total_cents`.
* **Order Snapshots**: Price, title, SKU, and addresses are frozen in `order_items` and JSONB address fields at checkout.
* **Inventory Deduction**: Deducted in a single atomic database transaction upon successful Stripe webhook confirmation.

---

## 5. Migration Strategy

* Managed exclusively through **Prisma Migrate** (`npx prisma migrate dev`).
* Production deployments run `npx prisma migrate deploy` via automated CI/CD pipeline.
