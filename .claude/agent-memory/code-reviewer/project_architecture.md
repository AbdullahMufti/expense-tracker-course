---
name: Project architecture and key conventions
description: Stack, component tree, intentional quirks, and review scope for the expense tracker
type: project
---

Single-page Vite + React 19 app. No routing, no state-management library, no backend, no test suite.

Stack: React 19, Vite 7, Recharts 3, plain CSS (App.css), Google Fonts (Playfair Display + DM Sans), ESLint 9.

Component tree and state ownership:
- App — owns `transactions[]` and `dark` (theme). Passes `onAdd` and `onDelete` callbacks down.
- Summary — pure display, computes totals internally via filter/reduce.
- SpendingChart — Recharts bar chart, filters to expense type only.
- TransactionForm — owns its own form state; calls `onAdd` on submit.
- TransactionList — owns its own filter state; calls `onDelete`.
- ThemeToggle — stateless, receives `dark` + `onToggle`.

Theme: persisted to localStorage key `ft-theme` via useEffect in App. Applied as `data-theme` attribute on `<html>`.

Intentional quirks (do NOT flag as bugs):
- "Freelance Work" seed transaction has `type:"expense"` but `category:"salary"`.
- `categories` array is duplicated in both TransactionForm and TransactionList by design.

**Why:** These are intentional starter-code decisions documented in CLAUDE.md.
**How to apply:** Skip these in every review; do not suggest consolidating categories unless user asks.
