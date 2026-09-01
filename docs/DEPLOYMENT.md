# Deployment Guide

## Overview

This guide covers the deployment process for the Brandford Ecommerce Platform to production environments using Vercel and Supabase.

## Deployment Architecture

```
Development → Staging → Production
    ↓            ↓          ↓
Local Dev   Vercel     Vercel
Supabase    Supabase   Supabase
(dev)       (staging)  (production)
```

## Prerequisites

### Required Accounts
- **Vercel account** for deployment
- **Supabase account** for production database
- **Stripe account** for production payments
- **Resend account** for production emails
- **Sentry account** for error tracking
- **Custom domain** (optional but recommended)

### Required Tools
- Git (for version control)
- Node.js 18+ (for local builds)
- Vercel CLI (optional)

## Environment Setup

### Production Environment Variables

Create environment variables in Vercel:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-production-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-production-publishable-key
STRIPE_SECRET_KEY=your-production-secret-key
STRIPE_WEBHOOK_SECRET=your-production-webhook-secret

# Resend Email
RESEND_API_KEY=your-production-resend-api-key

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your-production-sentry-dsn
SENTRY_AUTH_TOKEN=your-production-sentry-auth-token

# Application
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

### Staging Environment Variables

Use separate Supabase project and Stripe test mode:

```env
NEXT_PUBLIC_SUPABASE_URL=your-staging-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-staging-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-staging-service-role-key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-test-publishable-key
STRIPE_SECRET_KEY=your-stripe-test-secret-key
STRIPE_WEBHOOK_SECRET=your-staging-webhook-secret

NEXT_PUBLIC_APP_URL=https://staging.your-domain.com
NODE_ENV=production
```

## Database Deployment

### Production Database Setup

1. **Create Supabase Project**
   - Go to [Supabase dashboard](https://supabase.com/dashboard)
   - Create new project for production
   - Choose appropriate region
   - Set strong database password

2. **Configure Database**
   ```bash
   # Set production database URL
   DATABASE_URL="postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres"
   
   # Push schema to production
   npx prisma db push
   ```

3. **Enable Row-Level Security**
   - Go to Supabase dashboard → Authentication → Policies
   - Enable RLS on all tables
   - Add appropriate security policies

4. **Configure Backups**
   - Enable daily automated backups
   - Set point-in-time recovery window
   - Configure backup retention period

### Database Migration Strategy

```bash
# Development
npx prisma migrate dev --name migration_name

# Staging
npx prisma migrate deploy

# Production
npx prisma migrate deploy
```

### Database Seeding

```bash
# Seed production with initial data
npx prisma db seed
```

## Vercel Deployment

### Initial Setup

1. **Import Project to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy project
   vercel
   ```

2. **Configure Project Settings**
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm install`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required environment variables
   - Select appropriate environments (production, staging, preview)

### Continuous Deployment

#### Automatic Deployments

Vercel automatically deploys on push to configured branches:

- **Main branch** → Production deployment
- **Develop branch** → Staging deployment  
- **Feature branches** → Preview deployments

#### Manual Deployments

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

### Build Optimization

#### Next.js Configuration

```typescript
// next.config.ts
export default {
  // Optimize images
  images: {
    domains: ['your-supabase-project.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize production builds
  swcMinify: true,
  
  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
}
```

#### Build Cache

Vercel automatically caches build dependencies for faster deployments.

## Stripe Production Setup

### Production Stripe Account

1. **Create Stripe Account**
   - Go to [Stripe dashboard](https://dashboard.stripe.com)
   - Complete business verification
   - Enable production mode

2. **Configure Stripe Connect**
   - Create Connect application
   - Configure redirect URLs
   - Set up webhook endpoints
   - Configure vendor onboarding flow

3. **Webhook Configuration**
   ```
   Production webhook URL: https://your-domain.com/api/webhooks/stripe
   Events to listen for:
   - payment_intent.succeeded
   - payment_intent.failed
   - charge.refunded
   - customer.subscription.created
   - customer.subscription.deleted
   ```

### Stripe CLI for Testing

```bash
# Install Stripe CLI
npm install -g stripe-cli

# Login to Stripe
stripe login

# Forward webhooks locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Supabase Production Setup

### Production Configuration

1. **Database Configuration**
   - Enable connection pooling
   - Configure appropriate compute resources
   - Set up read replicas if needed
   - Configure backup strategy

2. **Storage Configuration**
   - Create production storage buckets
   - Configure CORS policies
   - Set up CDN if needed
   - Configure image transformation settings

3. **Authentication Configuration**
   - Configure email templates
   - Set up custom SMTP (optional)
   - Configure social providers
   - Enable advanced security features

### Supabase CLI for Local Development

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to project
supabase link --project-ref your-project-id

# Start local development
supabase start
```

## Custom Domain Setup

### Domain Configuration

1. **Purchase Domain**
   - Purchase domain from registrar (Namecheap, GoDaddy, etc.)
   - Or use existing domain

2. **Configure DNS**
   ```
   A Record: @ → 76.76.21.21 (Vercel)
   CNAME: www → cname.vercel-dns.com
   ```

3. **Configure in Vercel**
   - Go to Settings → Domains
   - Add custom domain
   - Vercel will provide DNS records
   - Update DNS at registrar
   - Wait for SSL certificate provisioning

### SSL Configuration

Vercel automatically provisions SSL certificates for custom domains using Let's Encrypt.

## Monitoring and Logging

### Sentry Configuration

1. **Create Sentry Project**
   - Go to [Sentry dashboard](https://sentry.io)
   - Create new project for Next.js
   - Configure project settings

2. **Install Sentry SDK**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

3. **Configure Sentry**
   ```typescript
   // sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs'
   
   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 0.1,
   })
   ```

### Vercel Analytics

Vercel Analytics is automatically enabled for performance monitoring:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## CI/CD Pipeline

### GitHub Actions Configuration

Create `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm test
      
      - name: Run E2E tests
        run: npm run test:e2e

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Required GitHub Secrets

Add these secrets to your GitHub repository:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Performance Optimization

### Build Optimization

```typescript
// next.config.ts
export default {
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compress output
  compress: true,
  
  // Enable production optimizations
  productionBrowserSourceMaps: false,
}
```

### Runtime Optimization

- Use server components for static content
- Implement proper caching strategies
- Optimize database queries
- Use CDN for static assets

## Security Hardening

### Environment Security

- Never commit environment variables
- Use different keys for each environment
- Rotate secrets regularly
- Use Vercel's environment variable protection

### Application Security

- Enable HTTPS (automatic with Vercel)
- Implement proper authentication
- Use security headers
- Rate limiting for API endpoints
- Input validation and sanitization

### Database Security

- Enable Row-Level Security
- Use principle of least privilege
- Regular security audits
- Monitor database access logs

## Scaling Strategy

### Vertical Scaling

**Vercel Pro Plan**
- Higher bandwidth limits
- Faster build times
- Priority support
- Advanced analytics

**Supabase Pro Plan**
- More database compute
- Higher connection limits
- Additional storage
- Point-in-time recovery

### Horizontal Scaling

**Database Read Replicas**
- Offload read queries
- Improve performance
- High availability

**CDN Optimization**
- Global edge network
- Automatic caching
- DDoS protection

## Backup and Disaster Recovery

### Database Backups

- **Automated daily backups**: Configured in Supabase
- **Point-in-time recovery**: 7-day window
- **Manual backups**: Weekly exports to external storage
- **Backup testing**: Regular restore testing

### Application Backups

- **Git version control**: Complete code history
- **Environment configuration**: Infrastructure as code
- **Asset backups**: Critical file backups

### Recovery Procedures

1. **Database Recovery**
   - Use Supabase point-in-time recovery
   - Restore from manual backup if needed
   - Verify data integrity

2. **Application Recovery**
   - Deploy from Git repository
   - Restore environment variables
   - Run database migrations

## Monitoring and Alerting

### Key Metrics to Monitor

- **Application uptime**
- **Response times**
- **Error rates**
- **Database performance**
- **Payment success rates**
- **User engagement metrics**

### Alert Configuration

Set up alerts for:
- High error rates
- Slow response times
- Database connection issues
- Payment failures
- SSL certificate expiration

## Post-Deployment Checklist

### Verification Steps

- [ ] Application loads successfully
- [ ] Authentication works correctly
- [ ] Database connections established
- [ ] Stripe payments processing
- [ ] Email sending functional
- [ ] Error tracking active
- [ ] Analytics collecting data
- [ ] SSL certificate valid
- [ ] Performance metrics acceptable
- [ ] Mobile responsive design working

### Smoke Tests

```bash
# Run critical path tests
npm run test:e2e

# Check database connectivity
npx prisma db push

# Verify environment variables
vercel env ls
```

## Rollback Procedure

### Automatic Rollback

Vercel maintains previous deployments:

```bash
# View deployment history
vercel list

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Manual Rollback

1. Revert problematic commit
2. Push to main branch
3. Automatic deployment triggers
4. Verify rollback success

## Troubleshooting

### Common Deployment Issues

**Build Failures**
```bash
# Check build logs in Vercel
# Verify environment variables
# Test build locally: npm run build
```

**Database Connection Issues**
```bash
# Verify DATABASE_URL
# Check Supabase status
# Test connection: npx prisma db push
```

**Environment Variable Issues**
```bash
# Verify variables in Vercel dashboard
# Check for typos in variable names
# Ensure proper variable scope
```

**Stripe Integration Issues**
```bash
# Verify webhook endpoints
# Check Stripe dashboard for errors
# Test webhook delivery with Stripe CLI
```

## Maintenance Schedule

### Regular Maintenance Tasks

**Daily**
- Monitor error rates
- Check performance metrics
- Review system logs

**Weekly**
- Review analytics
- Check backup status
- Monitor database performance

**Monthly**
- Security updates
- Dependency updates
- Performance optimization
- Cost review

**Quarterly**
- Security audit
- Performance review
- Disaster recovery testing
- Architecture review

## Cost Optimization

### Vercel Cost Management

- Monitor bandwidth usage
- Optimize image sizes
- Implement caching strategies
- Use appropriate plan for your needs

### Supabase Cost Management

- Monitor database size
- Optimize queries
- Implement proper indexing
- Archive old data if needed

### Third-Party Service Costs

- Review usage regularly
- Optimize email sending
- Monitor error tracking limits
- Scale services appropriately

This deployment guide provides a comprehensive approach to deploying and maintaining the Clicon Ecommerce Platform in production.