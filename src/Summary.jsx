import { useMemo } from 'react'
import { fmt, roundCurrency } from './utils'

function Summary({ transactions }) {
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = roundCurrency(
      transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    );
    const totalExpenses = roundCurrency(
      transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
    );
    return { totalIncome, totalExpenses, balance: roundCurrency(totalIncome - totalExpenses) };
  }, [transactions]);

  return (
    <div className="summary">
      <div className="summary-card">
        <span className="card-icon">↑</span>
        <h3>Total Income</h3>
        <p className="amount income-amount">${fmt(totalIncome)}</p>
      </div>
      <div className="summary-card">
        <span className="card-icon">↓</span>
        <h3>Total Expenses</h3>
        <p className="amount expense-amount">${fmt(totalExpenses)}</p>
      </div>
      <div className="summary-card">
        <span className="card-icon">◈</span>
        <h3>Net Balance</h3>
        <p className="amount balance-amount">
          {balance < 0 ? '−' : ''}${fmt(Math.abs(balance))}
        </p>
      </div>
    </div>
  );
}

export default Summary
