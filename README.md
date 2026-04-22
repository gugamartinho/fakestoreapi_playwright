# FakeStore API Automation Portfolio

E-commerce API automation project built with **Playwright** and **TypeScript**, demonstrating comprehensive API testing practices against the [FakeStoreAPI](https://fakestoreapi.com).

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | API request automation & assertions |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe testing with interface validation |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

## Project Structure

```
playwright-fakestoreapi-automation/
├── clients/                    # API client classes per resource
│   ├── ApiClient.ts            # Base HTTP client
│   ├── ProductsClient.ts       # /products endpoints
│   ├── UsersClient.ts          # /users and /auth endpoints
│   └── CartsClient.ts          # /carts endpoints
├── types/
│   └── api.types.ts            # TypeScript interfaces for all responses
├── tests/
│   ├── fixtures/               # Shared fixtures and test data
│   │   └── index.ts
│   ├── products.spec.ts        # Products API tests
│   ├── users.spec.ts           # Users & authentication tests
│   └── carts.spec.ts           # Shopping carts tests
├── .github/workflows/          # CI/CD pipeline
│   └── ci.yml
├── playwright.config.ts        # Playwright configuration
└── tsconfig.json
```

## Design Patterns

- **Client Layer** — HTTP calls abstracted per resource (Products, Users, Carts)
- **TypeScript Interfaces** — all API responses strongly typed, preventing schema regressions
- **Fixture Injection** — test clients injected via Playwright's built-in fixture system
- **Test Organization** — tests grouped by endpoint and HTTP method using `test.describe` blocks

## Test Coverage

| Resource | Method | Tests | Coverage |
|----------|--------|-------|----------|
| **Products** | GET /products | 3 | Listing, schema validation, pricing |
| | GET /products/:id | 3 | Single product, 404, required fields |
| | GET /products/categories | 2 | List categories, verify known categories |
| | GET /products/category/:category | 3 | Category filtering, empty results |
| | Sorting | 3 | Ascending, descending, limit parameter |
| **Users** | GET /users | 2 | Listing, complete data validation |
| | GET /users/:id | 4 | Single user, 404, email format, phone |
| | POST /auth/login | 3 | Valid login, invalid credentials, token format |
| | POST /users | 2 | Create user, generated id |
| | PUT /users/:id | 1 | Update user |
| | DELETE /users/:id | 1 | Delete user |
| **Carts** | GET /carts | 2 | Listing, valid structure |
| | GET /carts/:id | 3 | Single cart, 404, products array |
| | GET /carts/user/:userId | 2 | User carts, empty results |
| | POST /carts | 2 | Create cart, generated id |
| | PUT /carts/:id | 1 | Update cart |
| | DELETE /carts/:id | 1 | Delete cart |

**Total: 43 automated API tests**

## API Features Tested

✅ **Products** — listing, filtering by category, sorting, detailed product information  
✅ **Categories** — retrieving all categories, category-based filtering  
✅ **Users** — CRUD operations, user information completeness  
✅ **Authentication** — login with JWT token generation  
✅ **Carts** — shopping cart management, user-specific carts, cart operations  
✅ **Data Validation** — schema validation, type checking, format validation  
✅ **Error Handling** — 404s, 401s, response structure  

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/gugamartinho/fakestoreapi_playwright.git
cd fakestoreapi_playwright
npm install
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run with verbose output
npm run test:verbose

# Run specific test file
npx playwright test products.spec.ts

# Run specific test by name
npx playwright test -g "should return 200"

# View HTML report
npm run report
```

## CI/CD

Tests run automatically on:
- Every push to `main` or `develop` branch
- Every Pull Request targeting `main`
- Scheduled run Monday–Friday at 09:00 UTC

HTML reports are uploaded as GitHub Actions artifacts and retained for 30 days.

## Real-World Testing Scenarios

This project covers realistic e-commerce API testing:

- **Product Browsing** — list all products, filter by category, sort by price
- **User Management** — create accounts, authenticate, update profiles
- **Shopping Carts** — add items to cart, manage quantities, view user carts
- **Data Integrity** — validate schemas, verify pricing, check ratings

The test data mirrors actual usage patterns, making this portfolio directly applicable to production e-commerce APIs.

## Author

David Martinho — QA Automation Engineer  
[LinkedIn](https://linkedin.com/in/YOUR_PROFILE) · [GitHub](https://github.com/YOUR_USERNAME)
