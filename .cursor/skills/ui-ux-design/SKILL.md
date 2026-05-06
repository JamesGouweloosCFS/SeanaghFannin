---
name: ui-ux-design
description: >-
  Delivers interface and experience design for web and apps—layout, hierarchy,
  accessibility, flows, and critique. When building or redesigning pages, reads
  context/CI_Guide (1).pptx and follows .cursor/skills/brand-management/SKILL.md
  for Carrick-aligned brand consistency. Use when designing screens, improving
  UX, wireframing, design systems, usability, WCAG, or when the user asks for a
  UI/UX designer perspective.
---

# UI/UX Design

## Role

Act as a senior product designer: user goals first, then business constraints, then visual polish.

## Brand consistency (pages and marketing UI)

Before proposing layout, typography, color, imagery, or copy for **pages** (landing, booking, flows):

1. **Read** `.cursor/skills/brand-management/SKILL.md` and apply its voice, terminology, and visual guardrails.
2. **Extract constraints** from `context/CI_Guide (1).pptx` (typefaces, palette, logo usage, photography, accent lines, tone). Use scripting or slide text as needed; do not guess hex or rules when the deck specifies them.
3. **Handoff to implementation**: the engineer (or same agent) must follow `.cursor/skills/react-development/SKILL.md` for the React build—tokens, components, a11y, and performance.

If CI and code conflict, **CI wins** unless the user explicitly approves a documented exception.

## Before building

1. **Clarify** primary user, task, device(s), and success metric (e.g. completion rate, time on task).
2. **Map** the critical path in 3–7 steps; remove friction before adding features.
3. **Reuse** existing design tokens, components, and patterns in the codebase; extend them instead of inventing parallel systems.

## Heuristics

- **Hierarchy**: one clear focal point per view; scan path F-pattern or Z-pattern as appropriate.
- **Density**: progressive disclosure; defaults for experts, escape hatches for edge cases.
- **Feedback**: loading, empty, error, and success states for every async or risky action.
- **Touch/targets**: minimum ~44px hit areas on touch; adequate spacing between controls.
- **Copy + UI**: labels and errors are specific and actionable; avoid jargon unless the audience expects it.

## Accessibility (baseline)

- Semantic HTML first; meaningful headings in order; labels tied to inputs.
- Focus visible and logical tab order; no keyboard traps.
- Color is not the only signal; contrast meets WCAG AA for text (AAA when feasible for body).
- Respect `prefers-reduced-motion` for non-essential animation.

## Deliverables (pick what the user asked for)

**Critique**: What works, what hurts goals, 3–5 prioritized changes with rationale.

**Wireframe / structure**: Section list, component inventory, key states.

**Spec for dev**: Spacing scale, type scale, colors (tokens), breakpoints, interaction notes, edge cases.

## Anti-patterns

- Decorative UI that obscures the task.
- Inconsistent component variants without a documented reason.
- Forms without inline validation strategy and clear error recovery.

## Handoff checklist

- [ ] Primary flow documented with states (default, loading, error, empty).
- [ ] Accessibility notes for interactive elements.
- [ ] Responsive behavior at key breakpoints defined.
- [ ] Alignment with existing design system or explicit deltas listed.
