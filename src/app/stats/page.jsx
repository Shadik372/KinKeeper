'use client';

import { useTimeline } from '@/context/TimelineContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function StatsPage() {
  const { events } = useTimeline();

  const textCount = events.filter((e) => e.type === 'Text').length;
  const callCount = events.filter((e) => e.type === 'Call').length;
  const videoCount = events.filter((e) => e.type === 'Video').length;

  const data = [
    { name: 'Text', value: textCount, color: '#8b5cf6' },
    { name: 'Call', value: callCount, color: '#1A4731' },
    { name: 'Video', value: videoCount, color: '#22c55e' },
  ];

  const hasData = textCount > 0 || callCount > 0 || videoCount > 0;

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-10 max-w-5xl w-full flex-grow">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6 md:mb-8">Friendship Analytics</h1>

      <div className="bg-white p-5 md:p-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 relative">
        <h2 className="text-[#1A4731] font-semibold mb-4 md:mb-6 text-sm md:text-base">By Interaction Type</h2>

        {hasData ? (
          <div className="h-[280px] sm:h-[320px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius="55%"
                  outerRadius="70%"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '13px' }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '16px', fontSize: '13px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[280px] sm:h-[320px] md:h-[350px] w-full flex items-center justify-center text-gray-400 px-4 text-center text-sm md:text-base">
            <p>Log some interactions on a friend's profile to see your analytics!</p>
          </div>
        )}
      </div>
    </div>
  );
}
