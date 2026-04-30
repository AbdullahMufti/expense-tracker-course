import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedDesc = description.trim();
    if (!trimmedDesc || parseFloat(amount) <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      description: trimmedDesc,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2 className="section-title">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="tf-description" className="sr-only">Description</label>
          <input
            id="tf-description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="tf-amount" className="sr-only">Amount</label>
          <input
            id="tf-amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="field">
          <label htmlFor="tf-type" className="sr-only">Type</label>
          <select id="tf-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="tf-category" className="sr-only">Category</label>
          <select id="tf-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add +</button>
      </form>
    </div>
  );
}

export default TransactionForm
