-- Rollback migration for 002_rls_policies.sql
-- This removes all RLS policies and disables RLS on tables

-- Drop all policies in reverse order of creation

-- Reviews policies
DROP POLICY IF EXISTS "Users can delete own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can update own reviews" ON reviews;
DROP POLICY IF EXISTS "Users can create reviews" ON reviews;
DROP POLICY IF EXISTS "Users can view own reviews" ON reviews;
DROP POLICY IF EXISTS "Public can view reviews" ON reviews;

-- Payments policies
DROP POLICY IF EXISTS "Admins can view all payments" ON payments;
DROP POLICY IF EXISTS "Vendors can view payments for their products" ON payments;
DROP POLICY IF EXISTS "Users can view own payments" ON payments;

-- Order Items policies
DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;
DROP POLICY IF EXISTS "Vendors can view order items for their products" ON order_items;
DROP POLICY IF EXISTS "Users can view own order items" ON order_items;

-- Orders policies
DROP POLICY IF EXISTS "Users can create own orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Vendors can view orders for their products" ON orders;
DROP POLICY IF EXISTS "Users can view own orders" ON orders;

-- Cart Items policies
DROP POLICY IF EXISTS "Users can remove own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can update own cart items" ON cart_items;
DROP POLICY IF EXISTS "Users can add items to own cart" ON cart_items;
DROP POLICY IF EXISTS "Users can view own cart items" ON cart_items;

-- Carts policies
DROP POLICY IF EXISTS "Users can update own cart" ON carts;
DROP POLICY IF EXISTS "Users can create own cart" ON carts;
DROP POLICY IF EXISTS "Users can view own cart" ON carts;

-- Product Inventory policies
DROP POLICY IF EXISTS "Vendors can update own product inventory" ON product_inventory;
DROP POLICY IF EXISTS "Admins can view all inventory" ON product_inventory;
DROP POLICY IF EXISTS "Vendors can view own product inventory" ON product_inventory;

-- Products policies
DROP POLICY IF EXISTS "Vendors can delete own products" ON products;
DROP POLICY IF EXISTS "Vendors can update own products" ON products;
DROP POLICY IF EXISTS "Vendors can create products" ON products;
DROP POLICY IF EXISTS "Admins can view all products" ON products;
DROP POLICY IF EXISTS "Vendors can view own products" ON products;
DROP POLICY IF EXISTS "Public can view active products" ON products;

-- Vendor Profiles policies
DROP POLICY IF EXISTS "Vendors can update own profile" ON vendor_profiles;
DROP POLICY IF EXISTS "Admins can view all vendor profiles" ON vendor_profiles;
DROP POLICY IF EXISTS "Vendors can view own profile" ON vendor_profiles;

-- Users policies
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Users can view own profile" ON users;

-- Categories policy
DROP POLICY IF EXISTS "Public can view categories" ON categories;

-- Disable RLS on all tables
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE carts DISABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;
