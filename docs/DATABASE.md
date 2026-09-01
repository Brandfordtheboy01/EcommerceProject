# Database Schema Documentation

## Overview

The Clicon Ecommerce Platform uses Supabase PostgreSQL as its primary database, managed through Prisma ORM. The schema is designed to support a multi-vendor marketplace with comprehensive user management, product catalog, order processing, and vendor management.

## Database Models

### User
Represents all user types in the system (customers, vendors, admins).

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  emailVerified Boolean   @default(false)
  role          UserRole  @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  // Relations
  vendorProfile VendorProfile?
  orders        Order[]
  reviews       Review[]
  cart          Cart?
}

enum UserRole {
  CUSTOMER
  VENDOR
  ADMIN
  SUPER_ADMIN
}
```

**Fields:**
- `id`: Unique identifier
- `email`: User email (unique)
- `name`: Display name
- `image`: Profile image URL
- `emailVerified`: Email verification status
- `role`: User role (CUSTOMER, VENDOR, ADMIN, SUPER_ADMIN)
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

**Indexes:**
- Unique index on `email`
- Index on `role` for role-based queries

### VendorProfile
Extended profile information for vendor accounts.

```prisma
model VendorProfile {
  id                String             @id @default(cuid())
  userId            String             @unique
  user              User               @relation(fields: [userId], references: [id])
  businessName      String
  businessEmail     String             @unique
  verificationStatus VerificationStatus @default(PENDING)
  commissionRate    Decimal            @default(0.10)
  businessDetails   Json
  bankAccount       Json?
  createdAt         DateTime           @default(now())
  updatedAt         DateTime           @updatedAt
  
  // Relations
  products          Product[]
}

enum VerificationStatus {
  PENDING
  APPROVED
  REJECTED
  SUSPENDED
}
```

**Fields:**
- `id`: Unique identifier
- `userId`: Reference to User
- `businessName`: Legal business name
- `businessEmail`: Business contact email
- `verificationStatus`: Vendor verification status
- `commissionRate`: Platform commission rate (default 10%)
- `businessDetails`: JSON field for flexible business information
- `bankAccount`: JSON field for payout information
- `createdAt`: Profile creation timestamp
- `updatedAt`: Last update timestamp

**BusinessDetails Schema:**
```json
{
  "taxId": "string",
  "businessAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "country": "string"
  },
  "phone": "string",
  "website": "string",
  "description": "string"
}
```

### Category
Product categorization with hierarchical support.

```prisma
model Category {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  icon        String?
  parentId    String?
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
  createdAt   DateTime   @default(now())
}
```

**Fields:**
- `id`: Unique identifier
- `name`: Category name
- `slug`: URL-friendly slug
- `description`: Category description
- `icon`: Icon/emoji for display
- `parentId`: Parent category for hierarchy
- `parent`: Parent category relation
- `children`: Child categories relation
- `products`: Products in this category
- `createdAt`: Creation timestamp

**Indexes:**
- Unique index on `name` and `slug`
- Index on `parentId` for hierarchy queries

### Product
Core product entity with vendor relationships.

```prisma
model Product {
  id           String   @id @default(cuid())
  vendorId     String
  vendor       VendorProfile @relation(fields: [vendorId], references: [id])
  title        String
  description  String
  basePrice    Decimal
  comparePrice Decimal?
  categoryId   String
  category     Category @relation(fields: [categoryId], references: [id])
  
  // Flexible attributes
  attributes   Json
  images       String[]
  tags         String[]
  
  // Status
  isActive     Boolean  @default(true)
  isFeatured   Boolean  @default(false)
  
  inventory    ProductInventory?
  reviews      Review[]
  cartItems    CartItem[]
  orderItems   OrderItem[]
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

**Fields:**
- `id`: Unique identifier
- `vendorId`: Reference to vendor
- `vendor`: Vendor relation
- `title`: Product title
- `description`: Product description
- `basePrice`: Current selling price
- `comparePrice`: Original price (for discounts)
- `categoryId`: Reference to category
- `category`: Category relation
- `attributes`: JSON for flexible product attributes
- `images`: Array of image URLs
- `tags`: Array of search tags
- `isActive`: Product visibility status
- `isFeatured`: Featured product flag
- `inventory`: Inventory information
- `reviews`: Product reviews
- `cartItems**: Cart items
- `orderItems`: Order items
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Attributes Schema:**
```json
{
  "brand": "string",
  "model": "string",
  "specifications": {
    "weight": "number",
    "dimensions": {
      "length": "number",
      "width": "number",
      "height": "number"
    },
    "color": "string",
    "material": "string"
  },
  "features": ["string"]
}
```

**Indexes:**
- Index on `vendorId`
- Index on `categoryId`
- Index on `basePrice` for price filtering
- Index on `isActive` for active product queries
- Index on `isFeatured` for featured queries
- GIN index on `tags` for tag searches

### ProductInventory
Inventory tracking for products.

```prisma
model ProductInventory {
  id                String   @id @default(cuid())
  productId         String   @unique
  product           Product  @relation(fields: [productId], references: [id])
  quantity          Int      @default(0)
  reserved          Int      @default(0)
  lowStockThreshold Int      @default(10)
  lastUpdated       DateTime @default(now())
}
```

**Fields:**
- `id`: Unique identifier
- `productId`: Reference to product
- `product`: Product relation
- `quantity`: Available quantity
- `reserved`: Quantity reserved in pending orders
- `lowStockThreshold`: Alert threshold
- `lastUpdated`: Last inventory update

**Indexes:**
- Unique index on `productId`
- Index on `quantity` for low stock queries

### Cart
Shopping cart for users.

```prisma
model Cart {
  id        String     @id @default(cuid())
  userId    String     @unique
  user      User       @relation(fields: [userId], references: [id])
  items     CartItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

**Fields:**
- `id`: Unique identifier
- `userId`: Reference to user
- `user`: User relation
- `items`: Cart items
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### CartItem
Individual items in shopping cart.

```prisma
model CartItem {
  id        String   @id @default(cuid())
  cartId    String
  cart      Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  unitPrice Decimal  // Price at time of adding to cart
  
  @@unique([cartId, productId])
}
```

**Fields:**
- `id`: Unique identifier
- `cartId`: Reference to cart
- `cart`: Cart relation
- `productId`: Reference to product
- `product`: Product relation
- `quantity`: Item quantity
- `unitPrice`: Price at time of addition

**Constraints:**
- Unique constraint on `(cartId, productId)` to prevent duplicates

### Order
Customer orders with payment and shipping information.

```prisma
model Order {
  id              String       @id @default(cuid())
  userId          String
  user            User         @relation(fields: [userId], references: [id])
  orderNumber     String       @unique
  totalAmount     Decimal
  status          OrderStatus  @default(PENDING)
  shippingAddress Json
  billingAddress  Json?
  paymentMethod   String
  paymentStatus   PaymentStatus @default(PENDING)
  
  items           OrderItem[]
  payment         Payment?
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
  REFUNDED
}
```

**Fields:**
- `id`: Unique identifier
- `userId`: Reference to user
- `user`: User relation
- `orderNumber`: Human-readable order number
- `totalAmount`: Order total
- `status`: Order status
- `shippingAddress`: Shipping address JSON
- `billingAddress`: Billing address JSON
- `paymentMethod`: Payment method used
- `paymentStatus`: Payment status
- `items`: Order items
- `payment`: Payment information
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Address Schema:**
```json
{
  "fullName": "string",
  "addressLine1": "string",
  "addressLine2": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "country": "string",
  "phone": "string"
}
```

**Indexes:**
- Unique index on `orderNumber`
- Index on `userId`
- Index on `status`
- Index on `createdAt` for sorting

### OrderItem
Individual items within an order.

```prisma
model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  quantity  Int
  unitPrice Decimal
  vendorId  String  // For commission calculation
  
  createdAt DateTime @default(now())
}
```

**Fields:**
- `id`: Unique identifier
- `orderId`: Reference to order
- `order`: Order relation
- `productId`: Reference to product
- `product`: Product relation
- `quantity`: Item quantity
- `unitPrice`: Price at time of order
- `vendorId`: Vendor ID for commission calculation
- `createdAt`: Creation timestamp

**Indexes:**
- Index on `orderId`
- Index on `productId`
- Index on `vendorId`

### Payment
Payment information for orders.

```prisma
model Payment {
  id              String        @id @default(cuid())
  orderId         String        @unique
  order           Order         @relation(fields: [orderId], references: [id])
  amount          Decimal
  currency        String        @default("USD")
  status          PaymentStatus
  paymentMethod   String
  paymentIntentId String?       // Stripe payment intent ID
  metadata        Json?
  
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}
```

**Fields:**
- `id`: Unique identifier
- `orderId`: Reference to order
- `order`: Order relation
- `amount`: Payment amount
- `currency`: Payment currency
- `status`: Payment status
- `paymentMethod`: Payment method
- `paymentIntentId`: Stripe payment intent ID
- `metadata`: Additional payment metadata
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Indexes:**
- Unique index on `orderId`
- Index on `paymentIntentId`

### Review
Product reviews by customers.

```prisma
model Review {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  rating    Int      // 1-5 stars
  comment   String?
  isVerified Boolean  @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([userId, productId])
}
```

**Fields:**
- `id`: Unique identifier
- `userId`: Reference to user
- `user`: User relation
- `productId`: Reference to product
- `product`: Product relation
- `rating`: Star rating (1-5)
- `comment`: Review comment
- `isVerified`: Verified purchase flag
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Constraints:**
- Unique constraint on `(userId, productId)` to prevent multiple reviews

**Indexes:**
- Index on `productId`
- Index on `rating`
- Index on `isVerified`

## Database Relationships

### User Relationships
- User → VendorProfile (1:1)
- User → Orders (1:N)
- User → Reviews (1:N)
- User → Cart (1:1)

### Vendor Relationships
- VendorProfile → Products (1:N)
- VendorProfile → User (1:1)

### Product Relationships
- Product → VendorProfile (N:1)
- Product → Category (N:1)
- Product → ProductInventory (1:1)
- Product → Reviews (1:N)
- Product → CartItems (1:N)
- Product → OrderItems (1:N)

### Category Relationships
- Category → Products (1:N)
- Category → ParentCategory (N:1)
- Category → ChildCategories (1:N)

### Order Relationships
- Order → User (N:1)
- Order → OrderItems (1:N)
- Order → Payment (1:1)

## Database Indexes

### Performance Indexes
```sql
-- User indexes
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_user_role ON "User"(role);

-- Product indexes
CREATE INDEX idx_product_vendor ON "Product"(vendorId);
CREATE INDEX idx_product_category ON "Product"(categoryId);
CREATE INDEX idx_product_price ON "Product"(basePrice);
CREATE INDEX idx_product_active ON "Product"(isActive) WHERE isActive = true;
CREATE INDEX idx_product_featured ON "Product"(isFeatured) WHERE isFeatured = true;
CREATE INDEX idx_product_tags ON "Product" USING GIN(tags);

-- Full-text search
CREATE INDEX idx_product_search ON "Product" USING GIN(
  to_tsvector('english', title || ' ' || description)
);

-- Order indexes
CREATE INDEX idx_order_user ON "Order"(userId);
CREATE INDEX idx_order_status ON "Order"(status);
CREATE INDEX idx_order_created ON "Order"(createdAt DESC);

-- Inventory indexes
CREATE INDEX idx_inventory_product ON "ProductInventory"(productId);
CREATE INDEX idx_inventory_low_stock ON "ProductInventory"(quantity) 
  WHERE quantity <= lowStockThreshold;

-- Review indexes
CREATE INDEX idx_review_product ON "Review"(productId);
CREATE INDEX idx_review_rating ON "Review"(rating);
```

## Database Constraints

### Business Logic Constraints
- **Email uniqueness**: Users must have unique emails
- **Vendor email uniqueness**: Vendor business emails must be unique
- **Cart item uniqueness**: One product per cart entry
- **Review uniqueness**: One review per user per product
- **Order number uniqueness**: Order numbers must be unique

### Data Integrity
- **Foreign key constraints**: All relationships maintain referential integrity
- **Cascade deletes**: Cart items, order items deleted when parent deleted
- **Default values**: Sensible defaults for timestamps and status fields

## Row-Level Security (RLS)

Supabase Row-Level Security policies for data access control:

### User Table Policies
```sql
-- Users can read their own data
CREATE POLICY "Users can view own data" 
ON "User" FOR SELECT 
USING (auth.uid()::text = id);

-- Admins can read all data
CREATE POLICY "Admins can view all users" 
ON "User" FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM "User" 
    WHERE id = auth.uid()::text AND role = 'ADMIN'
  )
);
```

### Product Table Policies
```sql
-- Vendors can read their own products
CREATE POLICY "Vendors can view own products" 
ON "Product" FOR SELECT 
USING (
  vendorId IN (
    SELECT id FROM "VendorProfile" 
    WHERE userId = auth.uid()::text
  )
);

-- Public can read active products
CREATE POLICY "Public can view active products" 
ON "Product" FOR SELECT 
USING (isActive = true);
```

### Order Table Policies
```sql
-- Users can read their own orders
CREATE POLICY "Users can view own orders" 
ON "Order" FOR SELECT 
USING (userId = auth.uid()::text);

-- Vendors can read orders containing their products
CREATE POLICY "Vendors can view relevant orders" 
ON "Order" FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM "OrderItem" oi
    JOIN "Product" p ON oi.productId = p.id
    WHERE oi.orderId = "Order".id 
    AND p.vendorId IN (
      SELECT id FROM "VendorProfile" 
      WHERE userId = auth.uid()::text
    )
  )
);
```

## Database Migrations

### Migration Strategy
- Use Prisma migrations for schema changes
- Test migrations on development environment first
- Back up production database before major migrations
- Use transactional migrations when possible

### Migration Commands
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migration
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Studio for visual database management
npx prisma studio
```

## Database Backup & Recovery

### Backup Strategy
- **Automated backups**: Supabase daily backups
- **Point-in-time recovery**: 7-day recovery window
- **Manual backups**: Weekly exports to external storage
- **Critical data backups**: Before major changes

### Recovery Procedures
1. Use Supabase dashboard for point-in-time recovery
2. Use manual backup exports for full restoration
3. Test recovery procedures regularly

## Database Performance Optimization

### Query Optimization
- Use appropriate indexes for frequent queries
- Optimize JOIN operations with proper indexing
- Use materialized views for complex aggregations
- Implement query result caching

### Connection Management
- Use connection pooling (Supabase provides this)
- Implement query timeouts
- Monitor connection usage
- Optimize connection limits for your plan

### Monitoring
- Monitor slow queries via Supabase dashboard
- Track database size growth
- Monitor connection pool usage
- Set up alerts for performance degradation

## Database Scaling Strategy

### Vertical Scaling
- Upgrade Supabase plan for more resources
- Increase connection limits
- More storage and compute resources

### Horizontal Scaling
- Implement read replicas for reporting
- Use connection pooling for high concurrency
- Consider database sharding for massive scale

This database schema provides a solid foundation for a multi-vendor ecommerce platform with proper relationships, constraints, and security measures.