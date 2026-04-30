import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { fmt, roundCurrency } from './utils'

const COLORS = {
  food:          '#f59e0b',
  housing:       '#6366f1',
  utilities:     '#0ea5e9',
  transport:     '#10b981',
  entertainment: '#a78bfa',
  salary:        '#34d399',
  other:         '#6b7494',
};

// reads active theme tokens at render time — works for both dark and light mode
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const s = getComputedStyle(document.documentElement);
  const get = (v) => s.getPropertyValue(v).trim();
  return (
    <div style={{
      background: get('--bg2'),
      border: `1px solid ${get('--glass-border')}`,
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 13,
      color: get('--text'),
    }}>
      <p style={{ textTransform: 'capitalize', marginBottom: 4, color: get('--text-dim') }}>{label}</p>
      <p style={{ fontWeight: 600, color: get('--accent') }}>${fmt(payload[0].value)}</p>
    </div>
  );
};

function SpendingChart({ transactions }) {
  const data = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const totals = expenses.reduce((acc, t) => {
      acc[t.category] = roundCurrency((acc[t.category] || 0) + t.amount);
      return acc;
    }, {});
    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (data.length === 0) return null;

  return (
    <div className="chart-container">
      <h2 className="section-title">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'DM Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: 'var(--text-muted)', fontSize: 12, fontFamily: 'DM Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(128,128,128,0.08)' }} />
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
