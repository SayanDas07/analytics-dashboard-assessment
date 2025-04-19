import { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

type MapChartProps = {
  data: { city: string; count: number }[];
  darkMode?: boolean;
};

export function CityChartEV({ data, darkMode = false }: MapChartProps) {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.count - a.count).slice(0, 15);
  }, [data]);

  const getBarColor = (count: number) => {
    const max = sortedData[0]?.count || 1;
    const ratio = count / max;
    const intensity = Math.floor(50 + ratio * 180);
    return `rgb(25, ${intensity}, 235)`;
  };

  const gridColor = darkMode ? "#374151" : "#6B7280";
  const textColor = darkMode ? "#F9FAFB" : "#1F2937";
  const tooltipBg = darkMode ? "#1F2937" : "#FFFFFF";
  const tooltipShadow = darkMode ? "0 4px 12px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.1)";

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          data={sortedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 100 }}
        >
          <CartesianGrid stroke={gridColor} />
          <XAxis type="number" stroke={textColor} tick={{ fill: textColor }} />
          <YAxis
            dataKey="city"
            type="category"
            scale="band"
            tick={{ fontSize: 12, fill: textColor }}
            width={100}
            interval={0}
          />

          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()} vehicles`, 'Count']}
            labelFormatter={(label) => `City: ${label}`}
            contentStyle={{
              backgroundColor: tooltipBg,
              color: textColor,
              borderRadius: '8px',
              boxShadow: tooltipShadow,
              border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
            }}
            labelStyle={{ color: textColor, fontWeight: 500 }}
          />
          <Bar dataKey="count" barSize={20} name="Vehicles">
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.count)} />
            ))}
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
