-- Seed data for development and testing
-- This file creates: 1 admin, 2 vendors, 5 products, 1 customer with an order

-- Insert Admin User
INSERT INTO users (id, email, name, email_verified, role)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@clicon.com',
  'Admin User',
  true,
  'SUPER_ADMIN'
) ON CONFLICT (email) DO NOTHING;

-- Insert Customer User
INSERT INTO users (id, email, name, email_verified, role)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'customer@example.com',
  'John Customer',
  true,
  'CUSTOMER'
) ON CONFLICT (email) DO NOTHING;

-- Insert Vendor 1 User
INSERT INTO users (id, email, name, email_verified, role)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  'vendor1@techstore.com',
  'Tech Store Owner',
  true,
  'VENDOR'
) ON CONFLICT (email) DO NOTHING;

-- Insert Vendor 2 User
INSERT INTO users (id, email, name, email_verified, role)
VALUES (
  '00000000-0000-0000-0000-000000000004',
  'vendor2@fashionhub.com',
  'Fashion Hub Owner',
  true,
  'VENDOR'
) ON CONFLICT (email) DO NOTHING;

-- Insert Vendor 1 Profile (Tech Store)
INSERT INTO vendor_profiles (id, user_id, business_name, business_email, verification_status, commission_rate, business_details, bank_account)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000003',
  'Tech Store',
  'vendor1@techstore.com',
  'APPROVED',
  0.10,
  '{"description": "Premium electronics and gadgets", "website": "techstore.com", "phone": "+1234567890"}'::jsonb,
  '{"bankName": "Chase", "accountNumber": "****1234", "routingNumber": "****5678"}'::jsonb
) ON CONFLICT (user_id) DO NOTHING;

-- Insert Vendor 2 Profile (Fashion Hub)
INSERT INTO vendor_profiles (id, user_id, business_name, business_email, verification_status, commission_rate, business_details, bank_account)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000004',
  'Fashion Hub',
  'vendor2@fashionhub.com',
  'APPROVED',
  0.12,
  '{"description": "Trendy clothing and accessories", "website": "fashionhub.com", "phone": "+0987654321"}'::jsonb,
  '{"bankName": "Bank of America", "accountNumber": "****5678", "routingNumber": "****1234"}'::jsonb
) ON CONFLICT (user_id) DO NOTHING;

-- Insert Categories
INSERT INTO categories (id, name, slug, description, icon)
VALUES 
  ('20000000-0000-0000-0000-000000000001', 'Electronics', 'electronics', 'Electronic devices and gadgets', 'laptop'),
  ('20000000-0000-0000-0000-000000000002', 'Clothing', 'clothing', 'Fashion and apparel', 'shirt'),
  ('20000000-0000-0000-0000-000000000003', 'Accessories', 'accessories', 'Fashion accessories', 'watch')
ON CONFLICT (slug) DO NOTHING;

-- Insert Products from Vendor 1 (Tech Store)
INSERT INTO products (id, vendor_id, title, description, base_price, compare_price, category_id, images, tags, is_active, is_featured)
VALUES 
  (
    '30000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Wireless Bluetooth Headphones',
    'Premium noise-cancelling wireless headphones with 30-hour battery life',
    149.99,
    199.99,
    '20000000-0000-0000-0000-000000000001',
    ARRAY['https://example.com/headphones1.jpg', 'https://example.com/headphones2.jpg'],
    ARRAY['wireless', 'bluetooth', 'audio', 'noise-cancelling'],
    true,
    true
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Smart Watch Pro',
    'Advanced smartwatch with health tracking and GPS',
    299.99,
    349.99,
    '20000000-0000-0000-0000-000000000001',
    ARRAY['https://example.com/watch1.jpg', 'https://example.com/watch2.jpg'],
    ARRAY['smartwatch', 'fitness', 'gps', 'health'],
    true,
    true
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'Portable Power Bank 20000mAh',
    'High-capacity power bank with fast charging support',
    49.99,
    69.99,
    '20000000-0000-0000-0000-000000000001',
    ARRAY['https://example.com/powerbank1.jpg'],
    ARRAY['power', 'charging', 'portable', 'battery'],
    true,
    false
  )
ON CONFLICT DO NOTHING;

-- Insert Products from Vendor 2 (Fashion Hub)
INSERT INTO products (id, vendor_id, title, description, base_price, compare_price, category_id, images, tags, is_active, is_featured)
VALUES 
  (
    '30000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000002',
    'Premium Cotton T-Shirt',
    '100% organic cotton t-shirt with modern fit',
    29.99,
    39.99,
    '20000000-0000-0000-0000-000000000002',
    ARRAY['https://example.com/tshirt1.jpg', 'https://example.com/tshirt2.jpg'],
    ARRAY['cotton', 'organic', 'casual', 'clothing'],
    true,
    true
  ),
  (
    '30000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000002',
    'Leather Belt Classic',
    'Genuine leather belt with brushed metal buckle',
    44.99,
    59.99,
    '20000000-0000-0000-0000-000000000003',
    ARRAY['https://example.com/belt1.jpg'],
    ARRAY['leather', 'accessory', 'classic', 'fashion'],
    true,
    false
  )
ON CONFLICT DO NOTHING;

-- Insert Product Inventory
INSERT INTO product_inventory (id, product_id, quantity, reserved, low_stock_threshold)
VALUES 
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 50, 0, 10),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', 30, 0, 5),
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003', 100, 0, 20),
  ('40000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000004', 200, 0, 30),
  ('40000000-0000-0000-0000-000000000005', '30000000-0000-0000-0000-000000000005', 75, 0, 15)
ON CONFLICT (product_id) DO NOTHING;

-- Insert Cart for Customer
INSERT INTO carts (id, user_id)
VALUES (
  '50000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002'
) ON CONFLICT (user_id) DO NOTHING;

-- Insert Cart Items for Customer
INSERT INTO cart_items (id, cart_id, product_id, quantity, unit_price)
VALUES 
  ('60000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 2, 149.99),
  ('60000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000004', 1, 29.99)
ON CONFLICT (cart_id, product_id) DO NOTHING;

-- Insert Order for Customer
INSERT INTO orders (id, user_id, order_number, total_amount, status, shipping_address, billing_address, payment_method, payment_status)
VALUES (
  '70000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  'ORD-2024-001',
  329.97,
  'DELIVERED',
  '{"fullName": "John Customer", "addressLine1": "123 Main Street", "addressLine2": "Apt 4B", "city": "New York", "state": "NY", "postalCode": "10001", "country": "USA", "phone": "+1234567890"}'::jsonb,
  '{"fullName": "John Customer", "addressLine1": "123 Main Street", "addressLine2": "Apt 4B", "city": "New York", "state": "NY", "postalCode": "10001", "country": "USA", "phone": "+1234567890"}'::jsonb,
  'credit_card',
  'COMPLETED'
) ON CONFLICT (order_number) DO NOTHING;

-- Insert Order Items
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price, vendor_id)
VALUES 
  ('80000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 2, 149.99, '10000000-0000-0000-0000-000000000001'),
  ('80000000-0000-0000-0000-000000000002', '70000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000004', 1, 29.99, '10000000-0000-0000-0000-000000000002')
ON CONFLICT DO NOTHING;

-- Insert Payment for Order
INSERT INTO payments (id, order_id, amount, currency, status, payment_method, payment_intent_id, metadata)
VALUES (
  '90000000-0000-0000-0000-000000000001',
  '70000000-0000-0000-0000-000000000001',
  329.97,
  'USD',
  'COMPLETED',
  'credit_card',
  'pi_3abc123xyz',
  '{"cardLast4": "4242", "cardBrand": "Visa"}'::jsonb
) ON CONFLICT (order_id) DO NOTHING;

-- Insert Reviews
INSERT INTO reviews (id, user_id, product_id, rating, comment, is_verified)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 5, 'Amazing sound quality! Best headphones I have ever owned.', true),
  ('a0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000004', 4, 'Great quality t-shirt, very comfortable. Would buy again.', true)
ON CONFLICT (user_id, product_id) DO NOTHING;
