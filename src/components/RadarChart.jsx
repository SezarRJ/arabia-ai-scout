import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CustomRadarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <defs>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <PolarGrid stroke="#4A5568" />
        <PolarAngleAxis dataKey="label" tick={{ fill: '#A0AEC0', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar name="Score" dataKey="value" stroke="#8884d8" fill="url(#radarGradient)" fillOpacity={0.6} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            borderColor: '#4A5568',
            borderRadius: '0.5rem',
          }}
          labelStyle={{ color: '#E5E7EB' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadarChart;