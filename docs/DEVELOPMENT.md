# Development Guide

## Overview

This guide covers the development setup, workflow, and best practices for the Brandford Ecommerce Platform.
be sure to use the "SOLID principles" when developing.

## Prerequisites

### Required Software
- **Node.js** 18+ and npm
- **Git** for version control
- **Supabase account** (free tier works for development)
- **VS Code** (recommended) with these extensions:
  - ESLint
  - Prettier
  - Prisma
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (if using Volar)

### Optional but Recommended
- **Docker** for local development environment
- **Postico** or **TablePlus** for database management
- **Postman** or **Insomnia** for API testing

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/clicon-ecommerce.git
cd clicon-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Resend Email
RESEND_API_KEY=your-resend-api-key

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Seed database with initial data
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Branch Strategy

```
main (production)
├── develop (staging)
    ├── feature/authentication
    ├── feature/products
    ├── feature/cart
    └── feature/stripe-integration
```

### Feature Development Workflow

1. **Create feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes and test locally**
```bash
npm run dev
```

3. **Run tests**
```bash
npm test
npm run test:e2e
```

4. **Commit changes**
```bash
git add .
git commit -m "feat: add your feature description"
```

5. **Push to remote**
```bash
git push origin feature/your-feature-name
```

6. **Create Pull Request**
- Go to GitHub repository
- Create PR from your feature branch to `develop`
- Request code review

7. **Merge after approval**
- Merge to `develop` for staging
- Test in staging environment
- Merge to `main` for production

### Commit Message Convention

Use conventional commits:

```
feat: add product image upload
fix: correct cart total calculation
docs: update API documentation
style: format code with prettier
refactor: simplify product fetching logic
test: add unit tests for cart operations
chore: update dependencies
```

## Development Scripts

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm start               # Start production server

# Database
npm run db:push         # Push schema changes to database
npm run db:seed         # Seed database with test data
npm run db:studio       # Open Prisma Studio
npm run db:reset        # Reset database (development only)

# Testing
npm test                # Run unit tests
npm run test:e2e        # Run E2E tests
npm run test:coverage   # Run tests with coverage

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix linting issues
npm run format          # Format code with Prettier
npm run type-check      # Run TypeScript type checking
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes group
│   │   ├── (dashboard)/       # Dashboard routes group
│   │   ├── api/               # API routes
│   │   ├── products/          # Product pages
│   │   ├── checkout/          # Checkout pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── auth/             # Auth components
│   │   ├── products/         # Product components
│   │   └── cart/             # Cart components
│   ├── lib/                  # Utility functions
│   │   ├── supabase.ts       # Supabase client
│   │   ├── prisma.ts         # Prisma client
│   │   ├── trpc.ts           # tRPC setup
│   │   └── utils.ts          # General utilities
│   ├── server/               # Server-side utilities
│   │   ├── trpc/             # tRPC routers
│   │   └── actions/          # Server actions
│   ├── hooks/                # Custom React hooks
│   │   ├── use-cart.ts       # Cart hook
│   │   └── use-auth.ts       # Auth hook
│   ├── types/                # TypeScript types
│   │   └── index.ts          # Global types
│   └── styles/               # Global styles
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Database seeding
├── public/                  # Static assets
├── docs/                    # Documentation
└── tests/                   # Test files
```

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Avoid `any` types - use proper typing
- Use interfaces for object shapes
- Use type aliases for unions and complex types
- Enable all strict compiler options

### React Components

```typescript
// Functional components with hooks
interface ComponentProps {
  title: string
  onAction: () => void
}

export function Component({ title, onAction }: ComponentProps) {
  // Component logic
  return <div>{title}</div>
}
```

### Server Components

```typescript
// Use async for data fetching
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  return <ProductDetails product={product} />
}
```

### tRPC Procedures

```typescript
// Define input and output types
const protectedProcedure = t.procedure.use(isAuthed)

export const productsRouter = router({
  list: publicProcedure
    .input(z.object({
      page: z.number().optional(),
      limit: z.number().optional(),
    }))
    .query(async ({ input }) => {
      return await getProducts(input)
    }),
})
```

## Database Development

### Prisma Workflow

```bash
# Modify schema.prisma
# Generate migration
npx prisma migrate dev --name describe_changes

# Apply to database
npx prisma migrate deploy

# View in Studio
npx prisma studio
```

### Database Seeding

```typescript
// prisma/seed.ts
async function main() {
  // Create test data
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      role: 'CUSTOMER',
    },
  })
  
  console.log('Database seeded')
}
```

### Query Optimization

```typescript
// Use select for specific fields
const products = await prisma.product.findMany({
  select: {
    id: true,
    title: true,
    basePrice: true,
  },
})

// Use include for relations
const products = await prisma.product.findMany({
  include: {
    vendor: true,
    category: true,
  },
})

// Use where for filtering
const products = await prisma.product.findMany({
  where: {
    isActive: true,
    basePrice: { gte: 100 },
  },
})
```

## API Development

### tRPC Router Structure

```typescript
// server/trpc/index.ts
import { router } from './trpc'
import { authRouter } from './routers/auth'
import { productsRouter } from './routers/products'
import { cartRouter } from './routers/cart'

export const appRouter = router({
  auth: authRouter,
  products: productsRouter,
  cart: cartRouter,
})

export type AppRouter = typeof appRouter
```

### Client Usage

```typescript
// hooks/useProducts.ts
import { trpc } from '@/lib/trpc'

export function useProducts() {
  return trpc.products.list.useQuery({
    page: 1,
    limit: 12,
  })
}
```

## Authentication Development

### Supabase Auth Integration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Protected Routes

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  return res
}
```

## Testing

### Unit Tests

```typescript
// __tests__/utils.test.ts
import { calculateTotal } from '@/lib/utils'

describe('calculateTotal', () => {
  it('should calculate total correctly', () => {
    const items = [{ price: 10, quantity: 2 }]
    expect(calculateTotal(items)).toBe(20)
  })
})
```

### E2E Tests

```typescript
// e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test('complete checkout flow', async ({ page }) => {
  await page.goto('/products')
  await page.click('text=Add to Cart')
  await page.click('text=Checkout')
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('text=Place Order')
  await expect(page.locator('text=Order Confirmed')).toBeVisible()
})
```

## Performance Optimization

### Code Splitting

```typescript
// Lazy load components
const ProductCard = dynamic(() => import('@/components/ProductCard'))
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.title}
  width={400}
  height={400}
  loading="lazy"
/>
```

### Caching

```typescript
// Use Next.js revalidation
export const revalidate = 3600 // 1 hour

// Use React Query caching
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000, // 5 minutes
})
```

## Debugging

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Database Debugging

```typescript
// Enable query logging
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})
```

### Error Tracking

```typescript
// Sentry integration for debugging
import * as Sentry from '@sentry/nextjs'

Sentry.captureException(error)
```

## Common Development Tasks

### Adding a New API Endpoint

1. Create tRPC router in `server/trpc/routers/`
2. Define input schema with Zod
3. Implement query/mutation logic
4. Add to main router
5. Create client hook if needed

### Adding a New Database Model

1. Update `prisma/schema.prisma`
2. Generate migration: `npx prisma migrate dev`
3. Update TypeScript types
4. Add seed data if needed
5. Update API endpoints

### Adding a New Page

1. Create page in `src/app/`
2. Add to navigation if needed
3. Implement SEO metadata
4. Add loading state if needed
5. Test responsive design

## Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Check connection string in .env.local
# Test connection: npx prisma db push
```

**TypeScript Errors**
```bash
# Regenerate types: npx prisma generate
# Check tsconfig.json configuration
```

**Build Errors**
```bash
# Clear cache: rm -rf .next
# Reinstall dependencies: rm -rf node_modules && npm install
```

**Supabase Auth Issues**
```bash
# Check environment variables
# Verify Supabase project settings
# Check RLS policies
```

## Best Practices

### Code Organization
- Keep components small and focused
- Use proper file naming conventions
- Group related files together
- Use barrel exports for cleaner imports

### Performance
- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Use code splitting strategically

### Security
- Never commit sensitive data
- Use environment variables for secrets
- Implement proper authentication
- Validate all user inputs
- Use HTTPS in production

### Testing
- Write tests for critical paths
- Aim for high test coverage
- Test both happy and error paths
- Use E2E tests for user flows

## Development Tools

### Recommended VS Code Extensions
- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- GitLens
- Thunder Client (API testing)

### Browser Extensions
- React Developer Tools
- Redux DevTools (if using Redux)
- Supabase Auth Helper

### CLI Tools
- Prisma Studio (database GUI)
- Supabase CLI (local development)
- Stripe CLI (payment testing)

## Getting Help

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [tRPC Documentation](https://trpc.io/docs)

### Internal Resources
- Project documentation in `/docs`
- Architecture documentation
- API documentation
- Database schema documentation

This development guide provides a comprehensive foundation for contributing to the Clicon Ecommerce Platform. Follow these standards and workflows to ensure consistent, high-quality code.