import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = {
  food:          '#f59e0b',
  housing:       '#6366f1',
  utilities:     '#0ea5e9',
  transport:     '#10b981',
  entertainment: '#a78bfa',
  salary:        '#34d399',
  other:         '#6b7494',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1a2035',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 13,
      color: '#e8eaf2',
    }}>
      <p style={{ textTransform: 'capitalize', marginBottom: 4, color: '#9aa3c2' }}>{label}</p>
      <p style={{ fontWeight: 600, color: '#f59e0b' }}>${payload[0].value.toFixed(2)}</p>
    </div>
  );
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
      <h2 className="section-title">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#6b7494', fontSize: 12, fontFamily: 'DM Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#6b7494', fontSize: 12, fontFamily: 'DM Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={52}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || '#6b7494'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
