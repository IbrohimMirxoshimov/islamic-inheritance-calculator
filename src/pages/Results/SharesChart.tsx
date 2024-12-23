import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@/components/theme-provider';
import { useLanguage } from '@/contexts/LanguageContext';

type Share = {
  heir: {
    relationship: string;
    count: number;
  };
  share: number;
};

type SharesChartProps = {
  shares: Share[];
};

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export default function SharesChart({ shares }: SharesChartProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const data = shares.map((share) => ({
    name: `${t(share.heir.relationship)}${share.heir.count > 1 ? ` (${share.heir.count})` : ''}`,
    value: share.share * 100,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={theme === 'dark' ? 'hsl(var(--background))' : '#fff'}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}