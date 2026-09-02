-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT
  USING (auth.uid()::text = id::text);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON users
  FOR SELECT
  USING (role = 'ADMIN' OR role = 'SUPER_ADMIN');

-- Users can update their own data
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE
  USING (auth.uid()::text = id::text);

-- Vendor Profiles policies
-- Vendors can view their own profile
CREATE POLICY "Vendors can view own profile" ON vendor_profiles
  FOR SELECT
  USING (auth.uid()::text = user_id::text);

-- Admins can view all vendor profiles
CREATE POLICY "Admins can view all vendor profiles" ON vendor_profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND (users.role = 'ADMIN' OR users.role = 'SUPER_ADMIN')
    )
  );

-- Vendors can update their own profile
CREATE POLICY "Vendors can update own profile" ON vendor_profiles
  FOR UPDATE
  USING (auth.uid()::text = user_id::text);

-- Products policies
-- Public can view active products
CREATE POLICY "Public can view active products" ON products
  FOR SELECT
  USING (is_active = true);

-- Vendors can view their own products (including inactive)
CREATE POLICY "Vendors can view own products" ON products
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM vendor_profiles
      WHERE vendor_profiles.id = products.vendor_id
      AND vendor_profiles.user_id::text = auth.uid()::text
    )
  );

-- Admins can view all products
CREATE POLICY "Admins can view all products" ON products
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND (users.role = 'ADMIN' OR users.role = 'SUPER_ADMIN')
    )
  );

-- Vendors can create products for their own profile
CREATE POLICY "Vendors can create products" ON products
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM vendor_profiles
      WHERE vendor_profiles.id = products.vendor_id
      AND vendor_profiles.user_id::text = auth.uid()::text
      AND vendor_profiles.verification_status = 'APPROVED'
    )
  );

-- Vendors can update their own products
CREATE POLICY "Vendors can update own products" ON products
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM vendor_profiles
      WHERE vendor_profiles.id = products.vendor_id
      AND vendor_profiles.user_id::text = auth.uid()::text
    )
  );

-- Vendors can delete their own products
CREATE POLICY "Vendors can delete own products" ON products
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM vendor_profiles
      WHERE vendor_profiles.id = products.vendor_id
      AND vendor_profiles.user_id::text = auth.uid()::text
    )
  );

-- Product Inventory policies
-- Vendors can view inventory for their products
CREATE POLICY "Vendors can view own product inventory" ON product_inventory
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products
      JOIN vendor_profiles ON vendor_profiles.id = products.vendor_id
      WHERE products.id = product_inventory.product_id
      AND vendor_profiles.user_id::text = auth.uid()::text
    )
  );

-- Admins can view all inventory
CREATE POLICY "Admins can view all inventory" ON product_inventory
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND (users.role = 'ADMIN' OR users.role = 'SUPER_ADMIN')
    )
  );

-- Vendors can update inventory for their products
CREATE POLICY "Vendors can update own product inventory" ON product_inventory
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM products
      JOIN vendor_profiles ON vendor_profiles.id = products.vendor_id
      WHERE products.id = product_inventory.product_id
      AND vendor_profiles.user_id::text = auth.uid()::text
    )
  );

-- Carts policies
-- Users can view their own cart
CREATE POLICY "Users can view own cart" ON carts
  FOR SELECT
  USING (user_id::text = auth.uid()::text);

-- Users can create their own cart
CREATE POLICY "Users can create own cart" ON carts
  FOR INSERT
  WITH CHECK (user_id::text = auth.uid()::text);

-- Users can update their own cart
CREATE POLICY "Users can update own cart" ON carts
  FOR UPDATE
  USING (user_id::text = auth.uid()::text);

-- Cart Items policies
-- Users can view items in their own cart
CREATE POLICY "Users can view own cart items" ON cart_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id::text = auth.uid()::text
    )
  );

-- Users can add items to their own cart
CREATE POLICY "Users can add items to own cart" ON cart_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id::text = auth.uid()::text
    )
  );

-- Users can update items in their own cart
CREATE POLICY "Users can update own cart items" ON cart_items
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id::text = auth.uid()::text
    )
  );

-- Users can remove items from their own cart
CREATE POLICY "Users can remove own cart items" ON cart_items
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM carts
      WHERE carts.id = cart_items.cart_id
      AND carts.user_id::text = auth.uid()::text
    )
  );

-- Orders policies
-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT
  USING (user_id::text = auth.uid()::text);

-- Vendors can view orders containing their products
CREATE POLICY "Vendors can view orders for their products" ON orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM order_items
      JOIN vendor_profiles ON vendor_profiles.id = order_items.vendor_id
      WHERE order_items.order_id = orders.id
      AND vendor_profiles.user_id::text = auth.uid()::text
    )
  );

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND (users.role = 'ADMIN' OR users.role = 'SUPER_ADMIN')
    )
  );

-- Users can create their own orders
CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT
  WITH CHECK (user_id::text = auth.uid()::text);

-- Order Items policies
-- Users can view items in their own orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id::text = auth.uid()::text
    )
  );

-- Vendors can view order items for their products
CREATE POLICY "Vendors can view order items for their products" ON order_items
  FOR SELECT
  USING (vendor_id IN (
    SELECT id FROM vendor_profiles WHERE user_id::text = auth.uid()::text
  ));

-- Admins can view all order items
CREATE POLICY "Admins can view all order items" ON order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND (users.role = 'ADMIN' OR users.role = 'SUPER_ADMIN')
    )
  );

-- Payments policies
-- Users can view payments for their own orders
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = payments.order_id
      AND orders.user_id::text = auth.uid()::text
    )
  );

-- Vendors can view payments for orders containing their products
CREATE POLICY "Vendors can view payments for their products" ON payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM order_items
      JOIN vendor_profiles ON vendor_profiles.id = order_items.vendor_id
      WHERE order_items.order_id = payments.order_id
      AND vendor_profiles.user_id::text = auth.uid()::text
    )
  );

-- Admins can view all payments
CREATE POLICY "Admins can view all payments" ON payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id::text = auth.uid()::text
      AND (users.role = 'ADMIN' OR users.role = 'SUPER_ADMIN')
    )
  );

-- Reviews policies
-- Public can view all reviews
CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT
  USING (true);

-- Users can view their own reviews
CREATE POLICY "Users can view own reviews" ON reviews
  FOR SELECT
  USING (user_id::text = auth.uid()::text);

-- Users can create reviews
CREATE POLICY "Users can create reviews" ON reviews
  FOR INSERT
  WITH CHECK (user_id::text = auth.uid()::text);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE
  USING (user_id::text = auth.uid()::text);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE
  USING (user_id::text = auth.uid()::text);

-- Categories and Product Inventory are public read for reference
CREATE POLICY "Public can view categories" ON categories
  FOR SELECT
  USING (true);
