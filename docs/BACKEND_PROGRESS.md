# Backend Definition of Done (DoD)

Companion to `Backend Development Progress Tracker`. A stage cannot move from
🟡 to 🟢 unless every item below is true — not just the checklist items in
the tracker itself. Checklists tell you *what* was built; DoD tells you it's
*safe to build on top of*.

## Baseline DoD — applies to every stage, every phase

- [ ] Code merged to the phase branch via PR, not pushed directly
- [ ] At least one other person (or a second agent review pass) reviewed the PR
- [ ] Unit tests exist for new logic and pass in CI
- [ ] No `any` types / unvalidated inputs — all external input goes through Zod
- [ ] tRPC error codes are meaningful (`NOT_FOUND`, `UNAUTHORIZED`, etc.), not generic 500s
- [ ] No secrets, keys, or `.env` values committed
- [ ] Agent Summary in the tracker is updated (≤5 lines) and "Last Updated" set
- [ ] No known regressions in previously-🟢 stages

If any baseline item is unmet, the stage stays 🟡 regardless of checklist completion.

---

## Phase 1: Foundation

### Stage 1: Database Setup
- [x] Supabase project configuration
- [x] Database schema creation (SQL migrations)
- [x] Database migrations
- [x] Seed data setup
- [x] Row-level security policies

**Status**: 🟢 Completed
**Last Updated**: 2026-09-02
**Agent Summary**: Supabase project configured with remote connections. Complete database schema created via SQL migrations (001_initial_schema.sql) with all core tables. RLS policies implemented (002_rls_policies.sql) for all user/vendor tables with proper role-based access - successfully applied to remote database. Seed data created (seed.sql) with 1 admin, 2 vendors, 5 products, 1 customer with an order. Rollback migrations created in separate folder.

**HumanDev Note**: feature/foundation branch successfully pushed and merged to main. Continuing with feature/authentication branch on the 2026-09-06 

---

### Stage 2: Authentication Setup
- [x] Sign up, sign in, sign out work end-to-end against Supabase Auth (not mocked)
- [x] Sessions persist across refresh and expire correctly
- [x] Protected route middleware rejects unauthenticated requests with `UNAUTHORIZED`, not a 500 or silent pass-through
- [x] Role system (customer / vendor / admin) is enforced server-side, not just hidden in the UI
- [x] Password requirements and email verification flow tested manually once
- **Not done if**: role checks exist only in the frontend — that's not auth, that's decoration.

**Status**: 🟢 Completed
**Last Updated**: 2026-09-08
**Agent Summary**: Implemented complete authentication system with Supabase SSR. Created protected route middleware (proxy.ts) with proper UNAUTHORIZED/FORBIDDEN responses. Added server-side role enforcement with dedicated tRPC procedures (adminProcedure, vendorProcedure, customerProcedure). Implemented password validation (min 6 chars, uppercase, lowercase, number). Created email verification flow with callback handling. Built login/signup forms with real authentication calls and toast notifications. Added test endpoints for role-based access control validation. All authentication requirements met per DoD.

### Stage 3: Basic API Structure
- [x] *(Already marked complete — confirm before sign-off:)*
- [ ] Every router has input validation on every mutation, not just the happy-path ones
- [ ] Error middleware returns consistent shapes the frontend can rely on
- [ ] At least one integration test hits a real (test) DB, not just mocked Zod schemas

---

## Phase 2: Core Features

### Stage 1: Product Management API
- [ ] CRUD respects vendor ownership — a vendor can't edit another vendor's product (test this, don't assume RLS covers it)
- [ ] List endpoint supports pagination and at least category + price-range filters
- [ ] Image upload validates file type/size server-side, not just in the client
- [ ] Out-of-stock and inactive products are excluded from public listings by default
- **Not done if**: filters work in Postman but the pagination defaults would return the entire catalog in production.

### Stage 2: User Management API
- [ ] Vendor registration produces a `pending` state that an admin must approve — no vendor is live by default
- [ ] Profile updates re-validate uniqueness constraints (email, business name) server-side
- [ ] Permission system tested with a matrix: each role × each endpoint, at least once
- **Not done if**: "vendor approval" exists as a DB column but nothing in the API actually blocks unapproved vendors from listing products.

### Stage 3: Shopping Cart API
- [ ] Guest cart and logged-in cart both work, and merging a guest cart into an account on login is tested
- [ ] Cart total recalculates server-side on every mutation — never trust a client-sent total
- [ ] Adding more than available stock is rejected with a clear error, not silently capped
- [ ] Cart expiry (30 days per business rules) is enforced by a job or query, not just documented
- **Not done if**: cart total is computed client-side and merely stored — that's a pricing bug waiting to happen.

---

## Phase 3: Payment & Orders

### Stage 1: Stripe Integration
- [ ] Webhook signature verification is implemented and tested with Stripe's CLI, not just assumed
- [ ] Idempotency handled — a retried webhook must not double-charge or double-fulfill
- [ ] Payment intent creation and order creation are transactionally consistent (no orphaned orders with no payment, or vice versa)
- [ ] Refund flow tested against Stripe's test mode end-to-end
- **Not done if**: webhook handling works in a manual test but there's no idempotency key check — this is the single highest-risk stage in the tracker and deserves the most scrutiny.

### Stage 2: Order Management
- [ ] Order status transitions follow an explicit state machine (no order can jump from `pending` to `delivered`)
- [ ] Inventory is decremented atomically with order creation (race condition tested: two simultaneous orders for the last unit)
- [ ] Order history endpoint is scoped per user — one customer cannot query another's orders by ID guessing
- **Not done if**: inventory updates happen in a separate, non-atomic step after order creation.

### Stage 3: Email Notifications
- [ ] Order confirmation and vendor notification emails fire on the correct trigger, verified in a staging inbox
- [ ] Failure to send does not fail or roll back the underlying order/payment
- [ ] Retry logic exists for transient Resend failures (3 attempts per business rules)
- **Not done if**: email sending is inline and synchronous with checkout — a Resend outage should not be able to block a purchase.

---

## Phase 4: Enhancement

### Stage 1: Search Implementation
- [ ] FTS returns relevant results for partial and misspelled queries within acceptable latency (define a number, e.g. <300ms p95)
- [ ] Search respects the same visibility rules as browsing (no inactive/out-of-stock leaking in by default)
- [ ] Faceted filters combine correctly (category + price + rating together, not just individually)
- **Not done if**: search works well on the 5-row seed dataset but was never tested against a realistic product volume.

### Stage 2: Advanced Features
- [ ] Review submission enforces "verified purchase only" and "one review per product per customer" at the API level
- [ ] Wishlist respects the 50-item limit and guest expiry
- [ ] Vendor dashboard and analytics endpoints are scoped — a vendor sees only their own data
- **Not done if**: the one-review-per-customer rule is enforced by a unique DB constraint alone with no user-facing error handling for the violation.

---

## Phase 5: Production Ready

### Stage 1: Performance Optimization
- [ ] Load test results exist (tool + numbers) for checkout and product listing under realistic concurrent load
- [ ] Slow queries identified via `EXPLAIN ANALYZE` and indexed, not guessed at
- [ ] Caching has an explicit invalidation strategy — no cache that can serve stale prices or stock
- **Not done if**: "performance optimization" is marked done without a before/after number to point to.

### Stage 2: Security Hardening
- [ ] Rate limiting is verified to actually trigger (hit the limit in a test, confirm the 429)
- [ ] Dependency audit (`npm audit` or equivalent) run with no unresolved high/critical vulnerabilities
- [ ] A basic pen-test pass (even informal) attempted against auth, IDOR on order/product IDs, and payment webhook spoofing
- **Not done if**: security hardening consists only of updating dependencies — the audit needs to touch the app's own logic, especially IDOR risks called out in earlier stages.

### Stage 3: Deployment Preparation
- [ ] CI/CD pipeline runs tests and blocks merge/deploy on failure — not just "a pipeline exists"
- [ ] Rollback procedure has been executed at least once in staging, not just documented
- [ ] Monitoring/alerting fires a real alert during a simulated failure (kill a dependency, confirm the page)
- **Not done if**: documentation is complete but nobody has actually pulled the rollback trigger to see if it works.

---

## Suggested tracker addition

Consider adding a `DoD Met` checkbox next to `Status` in the tracker, separate
from the task checklist — this keeps "did we build it" and "is it actually
safe to ship" visibly distinct, which is where most of the risk in this
particular stack (Stripe webhooks, RLS, cart totals) tends to hide.