# PracticeAngular - AI Coding Instructions

## Project Overview
**PracticeAngular** is a standalone Angular 19 learning project using TypeScript 5.6 and Tailwind CSS 4. It demonstrates modern Angular patterns: standalone components, signals, and non-modular architecture. The app contains a simple header component with a reusable primary button component.

## Architecture & Component Structure

### Standalone Component Pattern
This project uses **Angular's standalone API** (no NgModules). All components are self-contained:
- Define `standalone: true` in `@Component`
- Declare dependencies in the `imports` array
- Examples: `src/app/component/header/header.component.ts`, `src/app/component/primary-button/primary-button.component.ts`

### Bootstrap & Configuration
- **Entry point**: `src/main.ts` bootstraps `AppComponent` with `bootstrapApplication()`
- **App config**: `src/app/app.config.ts` provides `Zone` change detection and router (currently empty routes)
- **Root component**: `src/app/app.component.ts` imports and renders only `HeaderComponent`

### Component Hierarchy
```
AppComponent
└── HeaderComponent (uses signal for title)
    └── PrimaryButtonComponent
```

## Key Development Patterns

### State Management with Signals
Use Angular's `signal()` API (imported from `@angular/core`) for reactive state:
```typescript
title = signal('Jay Angular');  // in header.component.ts
```
Access signals in templates with function call syntax: `{{ title() }}`

### Component Composition
- Components import their dependencies in the `imports` array
- Use `templateUrl`/`styleUrl` for external templates and styles (not inline templates)
- Example: `HeaderComponent` imports `PrimaryButtonComponent` and uses it as `<app-primary-button></app-primary-button>`

### Routing Setup
Routes are defined in `src/app/app.routes.ts` as a `Routes` array. Currently empty, but extend here for new pages.

## Styling & Tailwind Integration

- **Global styles**: `src/styles.css` imports Tailwind with `@import "tailwindcss"`
- **Component styles**: Each component has its own `.css` file (e.g., `header.component.css`)
- **Utility classes**: Tailwind utility classes are used directly in templates (e.g., `class="bg-blue-500 text-white px-4 py-2 rounded"`)
- **Tailwind version**: `@tailwindcss/postcss: ^4.1.17` (PostCSS integration)

## Testing & Quality

### Test Framework
- **Test runner**: Karma with Jasmine (configured in `angular.json`)
- **Test files**: Colocated with components as `.spec.ts` files
- **Pattern**: Use `TestBed.configureTestingModule()` with the standalone component in imports
- Example test structure: `src/app/component/header/header.component.spec.ts`

### Running Tests
```bash
npm test  # Runs Karma/Jasmine tests in watch mode
```

## Build & Development Commands

```bash
npm start      # ng serve - Development server on localhost:4200 (auto-reload)
npm run build  # ng build - Production build (optimized)
npm run watch  # ng build --watch --configuration development - Watch mode
npm test       # ng test - Unit tests with Karma
```

## TypeScript Configuration

Strict compiler settings are enforced:
- `"strict": true` - Full type safety
- `"noImplicitOverride": true` - Prevent accidental method overrides
- `"noPropertyAccessFromIndexSignature": true` - Safer object access
- Target: ES2022 with ES2022 modules
- Use `.ts` extensions for all TypeScript files

## File Organization & Naming Conventions

- **Components**: `src/app/component/[feature]/[feature].component.ts|html|css|spec.ts`
- **Prefix**: All selectors use `app-` prefix (configurable in `angular.json`)
- **Structure**: Keep components focused; import reusable components into parents
- **Routes**: Add new routes to `src/app/app.routes.ts` when needed

## Common Tasks for AI Agents

### Add a New Component
1. Create directory: `src/app/component/[name]/`
2. Use Angular CLI: `ng generate component component/[name]` (auto-generates `.ts|html|css|spec.ts`)
3. Import in parent component's `imports` array
4. Use selector as custom element: `<app-[name]></app-[name]>`

### Add a Route
1. Edit `src/app/app.routes.ts`
2. Add route object: `{ path: 'route-name', component: YourComponent }`
3. Import `RouterOutlet` in components that need route rendering

### Update Styling
- Modify `src/styles.css` for global styles
- Modify component `.css` files for component-scoped styles
- Use Tailwind classes in templates (no need to write CSS for most cases)

## External Dependencies & Integration Points

- **@angular/router**: Injected in components via constructor (e.g., `PrimaryButtonComponent` has unused router injection)
- **RxJS**: Available via `~7.8.0` for reactive programming (not heavily used yet)
- **No backend integration**: This is a frontend-only practice project

## Important Notes for AI Agents

- **Empty routes**: The routing system is configured but routes array is empty—add routes as features expand
- **Commented code**: Some commented properties exist (e.g., `router` in `PrimaryButtonComponent`, `title` in `AppComponent`)—understand intent before uncommenting
- **Component dependencies**: Always check `imports` array when modifying component visibility
- **Test coverage**: All generated components have basic `.spec.ts` stubs—extend with meaningful tests
- **Tailwind benefits**: Use utility-first approach; avoid custom CSS unless Tailwind doesn't cover the need
