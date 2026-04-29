import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  food: '#FF8042',
  housing: '#0088FE',
  utilities: '#FFBB28',
  transport: '#00C49F',
  entertainment: '#A259FF',
  salary: '#82ca9d',
  other: '#aaa',
};

function SpendingChart({ transactions }) {
  const expenses = transactions.filter(t => t.type === 'expense');

  const totals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const data = Object.entries(totals).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(v) => `$${v}`} />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || '#ccc'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
