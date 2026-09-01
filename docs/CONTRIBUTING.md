# Contributing Guidelines

## Overview

Thank you for your interest in contributing to the Clicon Ecommerce Platform! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Read the [Development Guide](./DEVELOPMENT.md)
- Set up the development environment locally
- Familiarized yourself with the project structure
- Reviewed existing issues and pull requests

### First-Time Setup

1. **Fork the repository**
   ```bash
   # Fork the repository on GitHub
   # Clone your fork
   git clone https://github.com/yourusername/clicon-ecommerce.git
   cd clicon-ecommerce
   ```

2. **Set up upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/clicon-ecommerce.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Add your environment variables
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

## Contribution Workflow

### Finding Issues to Work On

1. **Check open issues** on GitHub
2. **Look for "good first issue"** labels
3. **Comment on the issue** you want to work on
4. **Wait for assignment** before starting work

### Creating a Pull Request

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation
   - Commit changes with conventional commits

3. **Test your changes**
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Provide a clear description of your changes
   - Link to related issues
   - Request review from maintainers

### Pull Request Template

```markdown
## Description
Brief description of changes made

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Fixes #issue_number

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Changes approved by all necessary parties

## Screenshots (if applicable)
Add screenshots for UI changes
```

## Coding Standards

### Code Style

We use **ESLint** and **Prettier** for code formatting:

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### TypeScript Guidelines

- **Use strict TypeScript configuration**
- **Avoid `any` types** - use proper typing
- **Use interfaces** for object shapes
- **Use type aliases** for unions and complex types
- **Add JSDoc comments** for complex functions

### React Guidelines

- **Use functional components** with hooks
- **Use TypeScript** for component props
- **Keep components small** and focused
- **Use proper prop types**
- **Implement error boundaries**

### tRPC Guidelines

- **Define input schemas** with Zod
- **Use proper typing** for procedures
- **Handle errors gracefully**
- **Add validation** for all inputs
- **Document complex procedures**

### Database Guidelines

- **Use Prisma migrations** for schema changes
- **Add indexes** for frequently queried fields
- **Use proper foreign key relationships**
- **Add constraints** for data integrity
- **Seed test data** for development

## Commit Guidelines

### Commit Message Format

We use **conventional commits**:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
feat(products): add product image upload
fix(cart): correct total calculation for discounts
docs(api): update authentication endpoint documentation
style(components): format code with prettier
refactor(auth): simplify authentication flow
test(checkout): add e2e tests for checkout flow
chore(deps): update dependencies
```

## Testing Guidelines

### Unit Tests

- **Test critical business logic**
- **Aim for high coverage** on important paths
- **Use descriptive test names**
- **Mock external dependencies**
- **Test both success and error cases**

### E2E Tests

- **Test critical user flows**
- **Test authentication flows**
- **Test checkout process**
- **Test admin operations**
- **Keep tests maintainable**

### Test Examples

```typescript
// Unit test example
describe('calculateCartTotal', () => {
  it('should calculate total correctly', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 }
    ]
    expect(calculateCartTotal(items)).toBe(25)
  })

  it('should handle empty cart', () => {
    expect(calculateCartTotal([])).toBe(0)
  })
})

// E2E test example
test('complete checkout flow', async ({ page }) => {
  await page.goto('/products')
  await page.click('text=Add to Cart')
  await page.click('text=Checkout')
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('text=Place Order')
  await expect(page.locator('text=Order Confirmed')).toBeVisible()
})
```

## Documentation Guidelines

### Code Documentation

- **Add JSDoc comments** for complex functions
- **Document component props** with TypeScript
- **Add inline comments** for complex logic
- **Keep documentation up to date**

### Project Documentation

- **Update README.md** for major features
- **Update API.md** for API changes
- **Update DATABASE.md** for schema changes
- **Update DEVELOPMENT.md** for workflow changes

### Documentation Example

```typescript
/**
 * Calculates the total price of items in a cart
 * @param items - Array of cart items with price and quantity
 * @param discount - Optional discount percentage (0-100)
 * @returns Total price after discount
 * @example
 * calculateCartTotal([{ price: 10, quantity: 2 }], 10) // Returns 18
 */
export function calculateCartTotal(
  items: CartItem[],
  discount?: number
): number {
  // Implementation
}
```

## Issue Reporting

### Bug Reports

When reporting a bug, include:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, etc.)
- **Stack traces** if available

### Feature Requests

When requesting a feature, include:

- **Clear description** of the feature
- **Use case** for the feature
- **Proposed implementation** if known
- **Alternatives considered**
- **Impact on existing features**

## Review Process

### Code Review Guidelines

- **Be constructive** in feedback
- **Focus on code quality** and maintainability
- **Ask questions** if something is unclear
- **Suggest improvements** when appropriate
- **Respect the author's** time and effort

### Review Checklist

- [ ] Code follows project guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes without discussion
- [ ] Performance implications considered
- [ ] Security implications considered
- [ ] Accessibility implications considered

### Merge Requirements

- **At least one approval** from maintainer
- **All CI checks** must pass
- **No unresolved conflicts**
- **Documentation updated** if needed
- **Tests added** for new features

## Project Structure

### File Organization

Follow the existing project structure:

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utility functions
├── server/           # Server-side code
├── hooks/            # Custom hooks
└── types/            # TypeScript types
```

### Naming Conventions

- **Files**: kebab-case (`product-card.tsx`)
- **Components**: PascalCase (`ProductCard`)
- **Functions**: camelCase (`calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`UserProps`)

## Performance Guidelines

### Optimization Best Practices

- **Use React.memo** for expensive components
- **Implement code splitting** for large components
- **Optimize images** with Next.js Image
- **Use proper caching** strategies
- **Minimize re-renders**

### Performance Testing

- **Test load times** with Lighthouse
- **Monitor bundle size** with webpack-bundle-analyzer
- **Profile database queries** with Prisma
- **Test API response times**

## Security Guidelines

### Security Best Practices

- **Never commit secrets** or sensitive data
- **Validate all user inputs**
- **Use parameterized queries** (Prisma handles this)
- **Implement proper authentication**
- **Use HTTPS** in production
- **Keep dependencies updated**

### Security Review

- **Check for vulnerabilities** with `npm audit`
- **Review dependencies** regularly
- **Implement rate limiting** for APIs
- **Use security headers**
- **Monitor for security issues**

## Release Process

### Version Bumping

We use semantic versioning:

- **MAJOR**: Breaking changes
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped
- [ ] Git tag created
- [ ] Release published

## Questions and Support

### Getting Help

- **Check documentation** first
- **Search existing issues**
- **Ask in GitHub Discussions**
- **Contact maintainers** for critical issues

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Requests**: Code changes and reviews

## Recognition

### Contributor Recognition

- **Contributors section** in README
- **Changelog credits** for significant contributions
- **Featured contributors** on project website

### Ways to Contribute

- **Code contributions**: Features, bug fixes
- **Documentation**: Improving guides and docs
- **Testing**: Writing and improving tests
- **Design**: UI/UX improvements
- **Bug reports**: Identifying and reporting issues
- **Feature requests**: Suggesting improvements
- **Code review**: Reviewing pull requests

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Additional Resources

- [Development Guide](./DEVELOPMENT.md)
- [API Documentation](./API.md)
- [Database Documentation](./DATABASE.md)
- [Architecture Documentation](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)

Thank you for contributing to the Brandford Ecommerce Platform! Your contributions help make this project better for everyone.