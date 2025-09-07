# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint for code quality checks
- `npm run prettier:fix` - Format code with Prettier

### Storybook
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build Storybook for deployment

### Testing
Tests are configured to run through Storybook using Vitest with Playwright browser testing. The testing setup is integrated with the Storybook workflow.

## Architecture

### Project Structure
This is a React + TypeScript component library/documentation project using:
- **Vite** as build tool with SWC for fast compilation
- **Tailwind CSS v4** for styling
- **Storybook** for component documentation and testing
- **Feature-based architecture** organized by domain

### Key Technologies
- React 19 with TypeScript
- Tailwind CSS v4 with Vite plugin
- Storybook with accessibility addon
- Vitest + Playwright for browser testing
- ESLint + Prettier for code quality

### TypeScript Configuration
- Uses `~/*` path alias mapping to `src/*` (configured in tsconfig.app.json)
- Strict TypeScript settings enabled
- Consistent type imports enforced via ESLint rule

### Feature Organization
Components are organized using feature-based architecture:
```
src/features/{domain}/
  ├── model/          # Business logic, hooks, types
  ├── ui/             # React components
  └── *.stories.tsx   # Storybook stories
```

Example: `src/features/carousel/` contains infinite carousel component with custom hooks and TypeScript types.

### Styling Approach
- Uses Tailwind CSS v4 with utility classes
- Gradient backgrounds and modern UI patterns
- Responsive design with proper touch/mouse event handling
- Custom CSS in component-specific files when needed

### Storybook Integration
- Stories located alongside components
- Configured for accessibility testing
- Uses Vitest addon for component testing
- GitHub Pages deployment workflow on PR merge with 'storybook' label

### Development Workflow
- Node.js version specified in `.nvmrc` (v22)
- ESLint enforces consistent-type-imports and Prettier formatting
- Git branch strategy: feature branches → main
- Automated Storybook deployment to GitHub Pages

## Important Notes
- Always use type imports (`import type`) for TypeScript types
- Follow the existing feature-based organization for new components
- Components should include Storybook stories for documentation
- Use Tailwind utility classes following the existing patterns
- Test components through Storybook integration