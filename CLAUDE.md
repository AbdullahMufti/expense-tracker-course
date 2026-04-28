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

Single-page React app (Vite + React 19) with no routing, no state management library, and no backend — data is not persisted between page reloads.

**Component tree**:
```
App                  — owns transactions[] state, passes onAdd callback down
├── Summary          — receives transactions[], computes totalIncome/totalExpenses/balance internally
├── TransactionForm  — owns its own form state (description, amount, type, category); calls onAdd(transaction) on submit
└── TransactionList  — receives transactions[], owns its own filter state (filterType, filterCategory)
```

**Transaction shape**: `{ id, description, amount, type, category, date }` where `amount` is a number, `type` is `"income"` or `"expense"`, and `category` is one of `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`. The `categories` array is defined locally in both `TransactionForm` and `TransactionList`.

**Styling**: `src/App.css` uses plain CSS classes. The `.delete-btn` class is defined but no delete feature exists yet.

**Known intentional issue**: "Freelance Work" seed data has `type: "expense"` but `category: "salary"` — a data inconsistency left from the original starter.
