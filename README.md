# RippleJS Example App

An interactive multi-page application built with RippleJS, TypeScript, Vite, and TailwindCSS. This example demonstrates key RippleJS concepts including reactive state management, component composition, conditional rendering, client-side routing, and page metadata management.

## Features

- **Interactive Counter**: Increment, decrement, and multiply operations
- **Modal Dialog**: Information dialog with backdrop and close functionality
- **Client-Side Routing**: Custom router with navigation and browser history support
- **Page Metadata**: Dynamic title and meta tag management for SEO
- **Reactive State**: Demonstrates `$` prefixed reactive variables and `track()` API
- **Component Architecture**: Reusable Button, Card, and InfoDialog components
- **TailwindCSS Styling**: Modern responsive design with utility classes

## Pages

- **Home (`/`)**: Interactive counter with modal dialog
- **About (`/about`)**: Information about the Ripple framework
- **Pokemon (`/pokemon`)**: Displays 5 Pokemon fetched from PokeAPI with images and refresh functionality
- **User (`/user/{id}`)**: Dynamic user profile page with parameterized routing

## Getting Started

### Prerequisites

- Bun (recommended) or npm/yarn/pnpm

### Installation & Development

1. Install dependencies:

    ```bash
    bun install
    # or npm install / yarn install / pnpm install
    ```

2. Start the development server (Vite):

    ```bash
    bun run dev
    # or npm run dev / yarn dev / pnpm dev
    ```

    This starts the Vite dev server with hot module replacement.

3. Alternative: Build and run with Bun server:

    ```bash
    bun run dev:bun
    ```

    This builds the project and runs it on the production Bun server (default port: 3001).

### Production

1. Build for production:

    ```bash
    bun run build
    # or npm run build / yarn build / pnpm build
    ```

2. Start production server:

    ```bash
    bun run start
    ```

    Runs on port 3001 by default. Override with `PORT` environment variable:
    ```bash
    PORT=8080 bun run start
    ```

3. Preview production build (Vite preview):
    ```bash
    bun run serve
    # or npm run serve / yarn serve / pnpm serve
    ```

## Project Structure

```
src/
├── App.ripple              # Main app component with routing
├── router.ripple           # Custom router implementation
├── index.ts                # App entry point
├── index.css               # Global styles
├── types.d.ts              # TypeScript declarations
├── routes.ts               # Route configuration for server-side routing
├── assets/                 # Static assets
│   └── favicon.ico
├── components/             # Reusable UI components
│   ├── Button.ripple
│   ├── Card.ripple
│   ├── InfoDialog.ripple
│   └── Spinner.ripple
├── hooks/                  # Custom hooks
│   ├── usePokemon.ripple   # Hook for fetching Pokemon data
│   └── useUser.ripple      # Hook for fetching user data (DummyJSON API)
└── pages/                  # Page components
    ├── Home.ripple
    ├── About.ripple
    ├── Pokemon.ripple
    └── User.ripple
```

## Custom Router System

This project includes a custom client-side router built specifically for Ripple with server-side rendering support.

### Server-Side Routing

The project includes a Bun server (`server.ts`) that provides SSR capabilities:

- Serves the built application from the `dist` folder
- Matches client-side routes defined in `src/routes.ts`
- Supports dynamic route parameters (e.g., `/user/{id}`)
- Injects initial route state via `window.__INITIAL_ROUTE__`
- Returns 404 for unsupported routes
- Handles static assets from `/assets/` path

### Client-Side Router

### Components

- **`<Router>`**: Main router component that manages routing state
- **`<Route>`**: Defines a route with path and component (`$element` prop)
- **`<Link>`**: Navigation component for client-side routing

### Functions

- **`navigateTo(path)`**: Programmatically navigate to a path
- **`getCurrentRoute()`**: Get current route path
- **`setPageMeta(meta)`**: Set page title and meta tags for SEO

### Basic Usage

```ripple
import { Router, Route, Link } from './router.ripple';

<Router>
  <Route path="/" $element={Home} />
  <Route path="/about" $element={About} />
</Router>

// Navigation
<Link to="/about">
  <button>Go to About</button>
</Link>
```

### Page Metadata

Each page component manages its own metadata:

```ripple
import { effect, setPageMeta } from '../router.ripple';

effect(() => {
	setPageMeta({
		title: 'Page Title',
		meta: [{
			name: 'description',
			content: 'Page description',
		}, {
			property: 'og:title',
			content: 'Social media title',
		}],
	});
});
```

## Code Formatting

This template includes Prettier with the Ripple plugin for consistent code formatting.

### Available Commands

- `bun run format` - Format all files
- `bun run format:check` - Check if files are formatted correctly

### Configuration

Prettier is configured in `.prettierrc` with the following settings:

- Uses tabs for indentation
- Single quotes for strings
- 100 character line width
- Includes the `prettier-plugin-ripple` for `.ripple` file formatting

### VS Code Integration

For the best development experience, install the [Prettier VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and the [Ripple VS Code extension](https://marketplace.visualstudio.com/items?itemName=ripplejs.ripple-vscode-plugin).

## Technologies Used

- **Ripple**: Modern TypeScript UI framework
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework (v4)
- **PostCSS**: CSS processing
- **Prettier**: Code formatting with Ripple plugin support
- **Bun**: Fast JavaScript runtime and server (for production)

## APIs Used

- **PokeAPI**: Free RESTful Pokémon API (https://pokeapi.co/)
- **DummyJSON**: Free fake REST API (https://dummyjson.com/) for user data

## Learn More

- [Ripple Documentation](https://github.com/trueadm/ripple)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
