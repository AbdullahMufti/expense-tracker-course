# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

Single-page React app (Vite + React 19). All application logic lives in one file: `src/App.jsx`.

**State** (all in `App`):
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a **string**, not a number — this is a known bug causing incorrect totals (the `reduce` sums strings via concatenation instead of numeric addition).
- Form fields: `description`, `amount`, `type`, `category`
- Filter fields: `filterType`, `filterCategory`

**Data flow**: `transactions` is filtered inline on every render into `filteredTransactions`. Totals (`totalIncome`, `totalExpenses`, `balance`) are also computed inline. There is no state management library, no routing, and no backend — data is not persisted between page reloads.

**Styling**: `src/App.css` uses plain CSS classes (`.income-amount`, `.expense-amount`, `.balance-amount`, `.delete-btn`). The `.delete-btn` class is defined in CSS but the delete button is not yet rendered in the JSX — it's a placeholder for a feature to be added.

**Known intentional issues** (this is a course starter project):
- `amount` stored as string causes wrong totals
- "Freelance Work" is coded as `type: "expense"` but `category: "salary"` — a data inconsistency
- No delete functionality despite `.delete-btn` CSS being present
- UI has no styling polish
