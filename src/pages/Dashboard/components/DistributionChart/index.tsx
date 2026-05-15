import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import type { DistributionData } from '@/services/dashboard/types';

interface DistributionChartProps {
  data: DistributionData[];
}

const COLORS = ['#1B3A6B', '#4F7FB8', '#64B5F6', '#90CAF9', '#BBDEFB'];

export const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  if (!data.length) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="name" outerRadius={80} label>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
