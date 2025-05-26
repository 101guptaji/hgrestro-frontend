// components/LineChart.jsx
import React from 'react';

const LineChart = ({ data }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const chartHeight = 150;
  const chartWidth = 300;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - (item.revenue / maxRevenue) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="line-chart">
      <svg width="100%" height="200" viewBox={`0 0 ${chartWidth} ${chartHeight + 50}`}>
        <polyline
          fill="none"
          stroke="#2196F3"
          strokeWidth="2"
          points={points}
        />
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * chartWidth;
          const y = chartHeight - (item.revenue / maxRevenue) * chartHeight;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#2196F3"
            />
          );
        })}
        <g className="x-axis">
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            return (
              <text
                key={index}
                x={x}
                y={chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                {item.day}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default LineChart;