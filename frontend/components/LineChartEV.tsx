import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface LineChartEVProps {
  data: Array<{ year: string; count: number }>;
  color?: string;
  darkMode?: boolean;
}

export function LineChartEV({ data, color = "#f72585", darkMode = false }: LineChartEVProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={darkMode ? "#555" : "#6B7280"}
        />
        <XAxis
          dataKey="year"
          tick={{ fill: darkMode ? '#bbb' : '#666', fontSize: 12 }}
          axisLine={{ stroke: darkMode ? '#777' : '#ccc' }}
        />
        <YAxis
          tick={{ fill: darkMode ? '#bbb' : '#666', fontSize: 12 }}
          axisLine={{ stroke: darkMode ? '#777' : '#ccc' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: darkMode ? '#333' : 'white',
            color: darkMode ? '#eee' : '#333',
            borderRadius: '8px',
            boxShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.15)'
          }}
          formatter={(value) => [`${value} vehicles`, 'Registrations']}
          labelStyle={{ color: darkMode ? '#eee' : '#333' }}
        />
        <Legend
          wrapperStyle={{ color: darkMode ? '#eee' : '#333' }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke={color}
          strokeWidth={3}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}