# API Documentation

## Overview

This document describes the API endpoints and data structures used in the Clicon Ecommerce Platform. The API is built using tRPC for type-safe client-server communication.

## API Architecture

### tRPC Setup

The API uses tRPC for end-to-end type safety:

```typescript
// server/api/trpc.ts
import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'
import superjson from 'superjson'

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
```

## API Endpoints

### Authentication

#### `auth.signIn`
Sign in a user with email and password.

**Input:**
```typescript
{
  email: string
  password: string
}
```

**Output:**
```typescript
{
  user: {
    id: string
    email: string
    name: string | null
    role: 'CUSTOMER' | 'VENDOR' | 'ADMIN'
  }
  session: {
    token: string
    expiresAt: Date
  }
}
```

#### `auth.signUp`
Register a new user account.

**Input:**
```typescript
{
  email: string
  password: string
  name: string
  role?: 'CUSTOMER' | 'VENDOR'
}
```

**Output:**
```typescript
{
  user: {
    id: string
    email: string
    name: string
    role: 'CUSTOMER' | 'VENDOR'
  }
}
```

#### `auth.signOut`
Sign out the current user.

**Output:**
```typescript
{
  success: boolean
}
```

### Products

#### `products.list`
Get a list of products with filtering and pagination.

**Input:**
```typescript
{
  page?: number
  limit?: number
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  vendorId?: string
  sortBy?: 'createdAt' | 'price' | 'rating' | 'name'
  sortOrder?: 'asc' | 'desc'
}
```

**Output:**
```typescript
{
  products: Array<{
    id: string
    title: string
    description: string
    basePrice: number
    comparePrice: number | null
    images: string[]
    vendor: {
      id: string
      businessName: string
    }
    category: {
      id: string
      name: string
      slug: string
    }
    rating: number
    reviewCount: number
    isActive: boolean
    createdAt: Date
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

#### `products.byId`
Get a single product by ID.

**Input:**
```typescript
{
  id: string
}
```

**Output:**
```typescript
{
  id: string
  title: string
  description: string
  basePrice: number
  comparePrice: number | null
  images: string[]
  attributes: Record<string, any>
  tags: string[]
  vendor: {
    id: string
    businessName: string
    verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  }
  category: {
    id: string
    name: string
    slug: string
  }
  inventory: {
    quantity: number
    lowStockThreshold: number
  }
  reviews: Array<{
    id: string
    rating: number
    comment: string | null
    user: {
      name: string
    }
    createdAt: Date
  }>
  rating: number
  reviewCount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

#### `products.create` (Vendor Only)
Create a new product.

**Input:**
```typescript
{
  title: string
  description: string
  basePrice: number
  comparePrice?: number
  categoryId: string
  images: string[]
  attributes?: Record<string, any>
  tags?: string[]
  inventoryQuantity: number
}
```

**Output:**
```typescript
{
  id: string
  title: string
  basePrice: number
  // ... other product fields
}
```

#### `products.update` (Vendor Only)
Update an existing product.

**Input:**
```typescript
{
  id: string
  title?: string
  description?: string
  basePrice?: number
  comparePrice?: number
  categoryId?: string
  images?: string[]
  attributes?: Record<string, any>
  tags?: string[]
  inventoryQuantity?: number
  isActive?: boolean
}
```

**Output:**
```typescript
{
  id: string
  // ... updated product fields
}
```

#### `products.delete` (Vendor Only)
Delete a product.

**Input:**
```typescript
{
  id: string
}
```

**Output:**
```typescript
{
  success: boolean
}
```

### Cart

#### `cart.get`
Get the current user's cart.

**Output:**
```typescript
{
  items: Array<{
    id: string
    product: {
      id: string
      title: string
      basePrice: number
      images: string[]
    }
    quantity: number
    unitPrice: number
    totalPrice: number
  }>
  totalQuantity: number
  totalPrice: number
}
```

#### `cart.addItem`
Add an item to the cart.

**Input:**
```typescript
{
  productId: string
  quantity: number
}
```

**Output:**
```typescript
{
  item: {
    id: string
    quantity: number
    unitPrice: number
  }
  cart: {
    totalQuantity: number
    totalPrice: number
  }
}
```

#### `cart.updateItem`
Update cart item quantity.

**Input:**
```typescript
{
  itemId: string
  quantity: number
}
```

**Output:**
```typescript
{
  item: {
    id: string
    quantity: number
    unitPrice: number
  }
  cart: {
    totalQuantity: number
    totalPrice: number
  }
}
```

#### `cart.removeItem`
Remove an item from the cart.

**Input:**
```typescript
{
  itemId: string
}
```

**Output:**
```typescript
{
  cart: {
    totalQuantity: number
    totalPrice: number
  }
}
```

#### `cart.clear`
Clear all items from the cart.

**Output:**
```typescript
{
  success: boolean
}
```

### Orders

#### `orders.create`
Create a new order from cart items.

**Input:**
```typescript
{
  shippingAddress: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    phone: string
  }
  billingAddress?: {
    fullName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  paymentMethodId: string
}
```

**Output:**
```typescript
{
  order: {
    id: string
    orderNumber: string
    totalAmount: number
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'
    items: Array<{
      id: string
      product: {
        id: string
        title: string
        images: string[]
      }
      quantity: number
      unitPrice: number
      totalPrice: number
    }>
    payment: {
      id: string
      amount: number
      status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
    }
    createdAt: Date
  }
  paymentIntent: {
    clientSecret: string
  }
}
```

#### `orders.list`
Get user's order history.

**Input:**
```typescript
{
  page?: number
  limit?: number
  status?: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'
}
```

**Output:**
```typescript
{
  orders: Array<{
    id: string
    orderNumber: string
    totalAmount: number
    status: string
    createdAt: Date
    items: Array<{
      title: string
      quantity: number
      totalPrice: number
    }>
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

#### `orders.byId`
Get a single order by ID.

**Input:**
```typescript
{
  id: string
}
```

**Output:**
```typescript
{
  id: string
  orderNumber: string
  totalAmount: number
  status: string
  shippingAddress: Record<string, string>
  billingAddress: Record<string, string> | null
  paymentMethod: string
  paymentStatus: string
  items: Array<{
    id: string
    product: {
      id: string
      title: string
      images: string[]
      vendor: {
        businessName: string
      }
    }
    quantity: number
    unitPrice: number
    totalPrice: number
  }>
  payment: {
    id: string
    amount: number
    status: string
    paymentMethod: string
  }
  createdAt: Date
  updatedAt: Date
}
```

### Categories

#### `categories.list`
Get all categories.

**Output:**
```typescript
{
  categories: Array<{
    id: string
    name: string
    slug: string
    description: string | null
    icon: string | null
    parentId: string | null
    children: Array<{
      id: string
      name: string
      slug: string
    }>
    productCount: number
  }>
}
```

#### `categories.byId`
Get a single category by ID.

**Input:**
```typescript
{
  id: string
}
```

**Output:**
```typescript
{
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  parentId: string | null
  parent: {
    id: string
    name: string
    slug: string
  } | null
  children: Array<{
    id: string
    name: string
    slug: string
  }>
  products: Array<{
    id: string
    title: string
    basePrice: number
    images: string[]
  }>
}
```

### Vendors

#### `vendors.profile`
Get current vendor's profile.

**Output:**
```typescript
{
  id: string
  userId: string
  businessName: string
  businessEmail: string
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED'
  commissionRate: number
  businessDetails: Record<string, any>
  bankAccount: Record<string, any> | null
  createdAt: Date
  stats: {
    totalProducts: number
    totalOrders: number
    totalRevenue: number
    pendingPayouts: number
  }
}
```

#### `vendors.updateProfile`
Update vendor profile.

**Input:**
```typescript
{
  businessName?: string
  businessEmail?: string
  businessDetails?: Record<string, any>
  bankAccount?: Record<string, any>
}
```

**Output:**
```typescript
{
  id: string
  // ... updated profile fields
}
```

#### `vendors.dashboard`
Get vendor dashboard data.

**Output:**
```typescript
{
  overview: {
    totalRevenue: number
    totalOrders: number
    totalProducts: number
    averageOrderValue: number
    pendingPayouts: number
  }
  recentOrders: Array<{
    id: string
    orderNumber: string
    totalAmount: number
    status: string
    createdAt: Date
  }>
  topProducts: Array<{
    id: string
    title: string
    totalSales: number
    totalRevenue: number
  }>
  salesChart: Array<{
    date: string
    revenue: number
    orders: number
  }>
}
```

### Search

#### `search.products`
Search products with full-text search.

**Input:**
```typescript
{
  query: string
  page?: number
  limit?: number
  category?: string
  minPrice?: number
  maxPrice?: number
}
```

**Output:**
```typescript
{
  results: Array<{
    id: string
    title: string
    description: string
    basePrice: number
    images: string[]
    vendor: {
      businessName: string
    }
    category: {
      name: string
      slug: string
    }
    rank: number
  }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  searchTime: number
}
```

## Error Handling

All API endpoints follow a consistent error handling pattern:

```typescript
{
  error: {
    message: string
    code: string
    details?: any
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: User not authenticated
- `FORBIDDEN`: User lacks permission
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Input validation failed
- `INTERNAL_ERROR`: Server error
- `RATE_LIMIT_EXCEEDED`: Too many requests

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Anonymous users**: 100 requests per minute
- **Authenticated users**: 1000 requests per minute
- **Vendor users**: 2000 requests per minute

## Webhooks

### Stripe Webhooks

#### `webhooks.stripe`
Handle Stripe webhook events.

**Events:**
- `payment_intent.succeeded`
- `payment_intent.failed`
- `charge.refunded`
- `customer.subscription.created`
- `customer.subscription.deleted`

## Client Usage

### React Component Example

```typescript
import { trpc } from '@/utils/trpc'

function ProductList() {
  const { data, isLoading } = trpc.products.list.useQuery({
    page: 1,
    limit: 12,
    category: 'electronics'
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {data?.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Server Component Example

```typescript
import { serverClient } from '@/utils/trpc/server'

async function ProductPage({ params }: { params: { id: string } }) {
  const product = await serverClient.products.byId({ id: params.id })

  return <ProductDetails product={product} />
}
```

## Authentication

Most endpoints require authentication. Use the `protectedProcedure` for protected routes:

```typescript
const protectedProcedure = t.procedure.use(isAuthed)
```

Authentication is handled via Supabase session tokens passed in HTTP-only cookies.

## Pagination

List endpoints support pagination:

```typescript
{
  page: number      // Current page (1-based)
  limit: number     // Items per page (default: 20, max: 100)
}
```

Response includes pagination metadata:

```typescript
{
  pagination: {
    page: number
    limit: number
    total: number        // Total items
    totalPages: number   // Total pages
  }
}
```

## Filtering

Many endpoints support filtering:

```typescript
{
  category?: string
  vendorId?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  search?: string
}
```

## Sorting

List endpoints support sorting:

```typescript
{
  sortBy?: 'createdAt' | 'price' | 'rating' | 'name'
  sortOrder?: 'asc' | 'desc'
}
```

## Versioning

The API is currently at version 1.0. Future versions will be indicated via URL path: `/api/v2/...`