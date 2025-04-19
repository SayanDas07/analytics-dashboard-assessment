import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PieChartEVProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  darkMode?: boolean;
  title?: string;
}

export function PieChartEV({
  data,
  colors = ["#4361ee", "#3a0ca3", "#4cc9f0", "#f72585", "#7209b7"],
  darkMode = false,
  title,
}: PieChartEVProps) {
  const textColor = darkMode ? '#F3F4F6' : '#1F2937';
  const bgColor = darkMode ? '#1F2937' : '#F9FAFB';

  const renderCustomizedLabel = (props: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    name: string;
    percent: number;
  }) => {
    const { cx, cy, midAngle, outerRadius, name, percent } = props;
    const radius = outerRadius * 1.15;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill={textColor}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12px"
        fontWeight="500"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderColorfulLegendText = (value: string) => {
    return <span style={{ color: textColor, fontSize: '14px' }}>{value}</span>;
  };

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: bgColor,
        boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
        border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
      }}
    >
      {title && (
        <h3
          style={{
            textAlign: 'center',
            color: textColor,
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            label={renderCustomizedLabel}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={darkMode ? `${colors[index % colors.length]}cc` : colors[index % colors.length]}
                stroke={darkMode ? '#1F2937' : '#FFFFFF'}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value} vehicles`, 'Count']}
            contentStyle={{
              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
              color: textColor,
              borderRadius: '8px',
              boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
              padding: '10px',
              border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
            }}
            labelStyle={{ color: textColor, fontWeight: 'bold', marginBottom: '6px' }}
          />
          <Legend
            formatter={renderColorfulLegendText}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconSize=



            {10}
            iconType="circle"
            wrapperStyle={{ paddingTop: '20px', color: textColor }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}