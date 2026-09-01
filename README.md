# Brandford Ecommerce Platform

A modern, multi-vendor ecommerce platform built with Next.js 16, Supabase, and TypeScript.

## 🚀 Tech Stack

```
🏗️ Frontend Framework: Next.js 16 + React 19
🔐 Authentication: Supabase Auth (passkeys + 2FA)
🗄️ Database: Supabase PostgreSQL (Database + Storage)
📊 ORM: Prisma
🔌 API Layer: tRPC (type-safe APIs)
⚡ Caching: Next.js built-in + React Query
📁 File Storage: Supabase Storage
💳 Payments: Stripe Connect
🔍 Search: PostgreSQL FTS
📧 Email: Resend
🎣 State Management: Zustand + React Query
✅ Validation: Zod + React Hook Form
🧪 Testing: Jest + Playwright
🚨 Error Tracking: Sentry
📈 Analytics: Vercel Analytics
🚀 Deployment: Vercel
```

## 📋 Features

### Core Features
- **Multi-vendor marketplace**: Multiple vendors can sell products
- **User authentication**: Email/password, passkeys, and 2FA support
- **Product catalog**: Advanced search, filtering, and categorization
- **Shopping cart**: Persistent cart with guest checkout
- **Order management**: Complete order lifecycle tracking
- **Payment processing**: Stripe Connect for vendor payouts
- **Vendor dashboard**: Inventory management and sales analytics
- **Admin panel**: Platform administration and analytics

### Technical Features
- **Type-safe APIs**: End-to-end type safety with tRPC
- **Real-time updates**: Supabase real-time subscriptions
- **Image optimization**: Automatic image optimization via Supabase
- **Performance**: Edge caching and Next.js optimization
- **Security**: Row-level security and authentication
- **Scalability**: Serverless architecture with auto-scaling

## 🏗️ Architecture

This project follows a modern, scalable architecture:

- **Frontend**: Next.js 16 with App Router and Server Components
- **Backend**: tRPC for type-safe API routes
- **Database**: Supabase PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth with passkeys and 2FA
- **Storage**: Supabase Storage for file management
- **Deployment**: Vercel for global edge deployment

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (free tier works for development)
- Stripe account (test mode for development)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/clicon-ecommerce.git
cd clicon-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment variables**
Create a `.env.local` file:
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

4. **Database setup**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to Supabase
npx prisma db push

# Seed database with initial data
npx prisma db seed
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── lib/              # Utility functions and configurations
│   ├── hooks/            # Custom React hooks
│   ├── server/           # Server-side utilities
│   └── types/            # TypeScript type definitions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding script
├── public/               # Static assets
└── docs/                 # Documentation
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Vercel Deployment
This project is configured for Vercel deployment. Push to your main branch to automatically deploy.

## 📊 Database Schema

The database uses the following main models:
- **User**: Customer, vendor, and admin accounts
- **Product**: Product listings with vendor relationships
- **Order**: Customer orders with items and payments
- **Category**: Product categorization
- **VendorProfile**: Vendor business information

See [DATABASE.md](./docs/DATABASE.md) for detailed schema information.

## 🔐 Authentication

Authentication is handled by Supabase Auth with:
- Email/password authentication
- Passkey support (WebAuthn)
- Two-factor authentication (TOTP)
- Row-level security for data access

## 💳 Payments

Payment processing uses Stripe Connect:
- Customer payments via Stripe Checkout
- Vendor payouts via Stripe Connect
- Webhook handling for payment events
- Multi-currency support

## 📈 Monitoring

- **Error tracking**: Sentry for error monitoring
- **Analytics**: Vercel Analytics for performance metrics
- **Logging**: Structured logging for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email hbrandart@gmail.com or open an issue in the repository.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [Supabase](https://supabase.com/)
- Database by [Supabase PostgreSQL](https://supabase.com/docs)
- UI components by [shadcn/ui](https://ui.shadcn.com/)
# EcommerceProject
