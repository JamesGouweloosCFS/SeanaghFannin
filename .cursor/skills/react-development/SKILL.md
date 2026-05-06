---
name: react-development
description: >-
  Builds and refactors React applications with modern patterns, performance,
  accessibility, and maintainability. Use when writing React components, hooks,
  Next.js/Remix/Vite apps, state management, testing, or frontend architecture.
---

# React Development

## Defaults

- **Stack-agnostic patterns** unless the repo already commits to a framework: match existing `package.json`, folder structure, and lint rules.
- **React 18+** mental model: concurrent-friendly effects, no reliance on stale closure bugs; prefer `useId` for SSR-safe IDs.
- **TypeScript** when the project uses it: explicit props types, narrow unions for variants, avoid `any`.

## Component design

- **Small, composable** components; colocate styles/tests with feature when that is the project norm.
- **Props**: stable API—variant + size + optional `className` for extension; document non-obvious props briefly.
- **Lists**: stable `key` from data ids; avoid array index for reorderable/filterable lists.
- **Server vs client**: in Next.js App Router, default Server Components; add `"use client"` only where interactivity or browser APIs require it.

## State and data

- **Local UI state**: `useState` / `useReducer`; **server cache**: TanStack Query, SWR, or framework loaders—match repo.
- **Effects**: minimal; prefer event handlers and derived state. Effects for sync with external systems only; cleanup subscriptions and timers.
- **Avoid** prop drilling when depth hurts readability—use context for truly cross-cutting theme/auth, not as a global store unless justified.

## Performance

- Memoize (`useMemo` / `useCallback` / `memo`) only when profiling or clear prop churn indicates need; avoid premature optimization.
- Code-split heavy routes and modals with `React.lazy` + `Suspense` where appropriate.
- Images: appropriate sizing, `loading`/`priority` per framework, modern formats when build supports them.

## Accessibility

- Prefer native elements (`button`, `a`, `label`, `dialog`); if building custom widgets, implement keyboard roving tabindex and ARIA per WAI-ARIA patterns.

## Testing

- Match project runner (Vitest/Jest + RTL). Test behavior and a11y roles, not implementation details.

## Anti-patterns

- Giant components mixing data fetching, formatting, and layout without splits.
- Effects that duplicate fetch logic already handled by a data library or loader.
- Inline anonymous functions in hot paths only when necessary; measure first.

## PR hygiene

- [ ] No console noise; errors handled for user-visible failures.
- [ ] Lint/typecheck passes; no unused exports from refactors.
- [ ] Loading and error boundaries where async UI warrants them.
