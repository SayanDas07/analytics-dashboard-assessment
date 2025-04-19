/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface BarChartEVProps {
  data: Array<{ Make: string; count: number }>;
  color?: string;
  darkMode?: boolean;
}

const AnimatedBar = (props: any) => {
  const [style, setStyle] = useState({
    opacity: 0,
    y: 20,
  });

  const { fill, x, y, width, height, index } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStyle({
        opacity: 1,
        y: 0,
      });
    }, index * 50);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <motion.rect
      initial={{ height: 0, y: props.y + props.height }}
      animate={{ 
        height: height,
        y: y,
        opacity: 1
      }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut",
        delay: index * 0.05
      }}
      x={x}
      width={width}
      fill={fill}
      radius={4}
    />
  );
};

export function BarChartEV({ data, color = "#4361ee", darkMode = false }: BarChartEVProps) {
 
  const top5Data = useMemo(() => {
    return [...data]
      .sort((a, b) => b.count - a.count) 
      .slice(0, 5); 
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={top5Data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#4B5563" : "#6B7280"} 
          />
          <XAxis
            dataKey="Make"
            tick={{ fill: darkMode ? '#D1D5DB' : '#4B5563', fontSize: 12 }}
            axisLine={{ stroke: darkMode ? '#6B7280' : '#D1D5DB' }}
          />
          <YAxis
            tick={{ fill: darkMode ? '#D1D5DB' : '#4B5563', fontSize: 12 }}
            axisLine={{ stroke: darkMode ? '#6B7280' : '#D1D5DB' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
              color: darkMode ? '#F3F4F6' : '#1F2937',
              borderRadius: '8px',
              border: darkMode ? '1px solid #4B5563' : '1px solid #E5E7EB',
              boxShadow: darkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.1)',
            }}
            formatter={(value) => [`${value} vehicles`, 'Count']}
            labelStyle={{ color: darkMode ? '#F3F4F6' : '#1F2937', fontWeight: 'bold' }}
          />
          <Bar
            dataKey="count"
            fill={darkMode ? `${color}cc` : color} 
            radius={[4, 4, 0, 0]}
            shape={<AnimatedBar />}
          
            onMouseEnter={(data, index) => {
              document.querySelector(`rect:nth-child(${index + 1})`)?.setAttribute('fill', darkMode ? `${color}` : `${color}dd`);
            }}
            onMouseLeave={(data, index) => {
              document.querySelector(`rect:nth-child(${index + 1})`)?.setAttribute('fill', darkMode ? `${color}cc` : color);
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}