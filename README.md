# E-Commerce Frontend

React/Redux frontend for a full-stack e-commerce application. See the [backend repository](https://github.com/RaulPetcu/ecommerce-backend) for API documentation and other details.

## Tech Stack

- **React** + **Redux** (with Redux Thunk)
- **React Router v6** — client-side routing with role-based private routes
- **Tailwind CSS** + **MUI** — styling and UI components
- **Stripe** — payment integration via `@stripe/react-stripe-js`
- **Vite** — build tool

## Features

- Product browsing with search, category filter, and price sorting
- Shopping cart with quantity management and localStorage persistence
- Multi-step checkout: address → payment method → order summary → payment
- Stripe payment flow with redirect confirmation
- Auth (login/register) with JWT, persisted to localStorage
- Role-based access: admin, seller, and user routes
- Admin/seller dashboard: products, categories, orders, sellers

## Project Structure

```
src/
├── components/
│   ├── auth/          # Login, Register
│   ├── cart/          # Cart, ItemContent, SetQuantity
│   ├── checkout/      # Checkout steps, Stripe/PayPal, OrderSummary
│   ├── products/      # Product listing, filters
│   ├── admin/         # Dashboard, products, orders, sellers, categories
│   └── shared/        # Navbar, Skeleton, PrivateRoute, etc.
├── hooks/             # useProductFilter, useOrderFilter, useCategoryFilter
├── store/
│   ├── actions/       # Redux action creators
│   └── reducers/      # cartReducer, authReducer, etc.
└── utils/             # formatPrice, truncateText
```
