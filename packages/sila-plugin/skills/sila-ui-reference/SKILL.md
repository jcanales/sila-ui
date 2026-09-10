---
name: sila-ui-reference
description: Use whenever building or modifying UI in a project that consumes sila-ui — before writing any JSX, load this skill to see the exact available components, props, and design tokens. Activate for "add a button", "build a modal", "what components do we have", "add a dialog", "style this like the design system", or any UI work in an app that imports from "sila-ui".
---

# sila-ui Design System Reference

This skill exists so generated UI code uses `sila-ui`'s real components and
token values — never invented colors, spacing, or one-off component
implementations. Read `sila-ui/packages/sila-ui/DESIGN_SYSTEM.md` in full
before writing or modifying any JSX in a project that depends on `sila-ui`.

## Rules

1. **Never hand-roll a component that already exists in `sila-ui`.** If the
   task needs a button, dialog, badge, card, tabs, tooltip, or any other
   primitive/card/layout/filter listed in `DESIGN_SYSTEM.md`, import it
   from `sila-ui` — do not write a new one inline.
2. **Never hardcode a color, shadow, or radius value that has a token.**
   Use the Tailwind classes the preset already defines (`bg-primary`,
   `text-teal-700`, `shadow-sm`, `rounded-lg`, etc.) — check
   `DESIGN_SYSTEM.md`'s token table first.
3. **Match variant names exactly.** `Button`'s `variant` prop is one of
   `default | destructive | outline | secondary | ghost | link` and `size`
   is one of `default | sm | lg | icon` — do not invent new variant names.
4. **If a genuinely new component is needed**, build it using only the
   existing primitives/tokens as building blocks (e.g. compose from
   `Card`/`Button`/`Badge`), and flag to the user that it might belong in
   `sila-ui` itself rather than the consuming app, per the "harvest,
   don't fork" lesson this design system exists to fix.
5. **Theme-agnostic by default.** Component code must never assume which
   theme (`theme.css` vs `theme-refresh.css`) is active — all visual
   differences between themes live in CSS custom properties and utility
   overrides, not in component logic.
