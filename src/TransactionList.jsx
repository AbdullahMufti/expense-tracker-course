import { useState } from 'react'
import { fmt } from './utils'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [confirmId, setConfirmId] = useState(null);

  let filtered = transactions;
  if (filterType !== "all") filtered = filtered.filter(t => t.type === filterType);
  if (filterCategory !== "all") filtered = filtered.filter(t => t.category === filterCategory);

  const handleDelete = (id) => {
    onDelete(id);
    setConfirmId(null);
  };

  return (
    <div className="transactions">
      <h2 className="section-title">Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No transactions match the current filters.</div>
      ) : (
        <table>
          <caption className="sr-only">Transaction history</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td className="desc">{t.description}</td>
                <td><span className="category-pill">{t.category}</span></td>
                <td>
                  <span className={`amount-cell ${t.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                    {t.type === 'income' ? '+' : '−'}${fmt(t.amount)}
                  </span>
                </td>
                <td className="actions-cell">
                  {confirmId === t.id ? (
                    <>
                      <button
                        className="delete-btn delete-confirm"
                        aria-label={`Confirm delete ${t.description}`}
                        onClick={() => handleDelete(t.id)}
                      >
                        Confirm
                      </button>
                      <button
                        className="delete-btn delete-cancel"
                        aria-label="Cancel delete"
                        onClick={() => setConfirmId(null)}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <button
                      className="delete-btn"
                      aria-label={`Delete ${t.description}`}
                      onClick={() => setConfirmId(t.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList
