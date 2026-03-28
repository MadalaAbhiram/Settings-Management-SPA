# Settings Management SPA

A React + Vite single-page application for managing user settings and tracking expenses with separate admin and user flows.

## Features

- Authentication with signup/login stored in local state
- Admin dashboard for viewing users and managing their settings
- User settings modules for general, notification, and privacy preferences
- Expense tracker with add, list, delete, and transaction views
- Persistent app state using `localStorage`
- GitHub Pages deployment workflow

## Project Structure

- `src/pages` contains route-level screens
- `src/Components` contains reusable UI pieces
- `src/context` contains global state and reducer logic
- `src/services` contains persistence and mock async services
- `src/hooks` contains reusable form behavior
- `src/utils` contains translation and validation helpers

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run test` runs lightweight unit tests with Node's built-in test runner
- `npm run preview` previews the production build locally

## Architecture Notes

- Routing is handled with nested `react-router-dom` routes.
- Global state is managed with React Context + `useReducer`.
- User settings are stored per user and applied through provider effects.
- Async save behavior is simulated through `mockApi.js` for viva/demo purposes.

## Deployment

GitHub Pages deployment is configured in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).  
Production builds use the repository base path from [`vite.config.js`](./vite.config.js).
