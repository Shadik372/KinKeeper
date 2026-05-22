'use client';

import { useState } from 'react';
import { useTimeline } from '@/context/TimelineContext';

export default function TimelinePage() {
  const { events } = useTimeline();
  const [filter, setFilter] = useState('All');

  const filteredEvents = events.filter(event => 
    filter === 'All' ? true : event.type === filter
  );

  const getEventIcon = (type) => {
    switch (type) {
      case 'Call': return <img src="/assets/call.png" alt="Call" className="w-6 h-6 object-contain" />;
      case 'Text': return <img src="/assets/text.png" alt="Text" className="w-6 h-6 object-contain" />;
      case 'Video': return <img src="/assets/video.png" alt="Video" className="w-6 h-6 object-contain" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 max-w-4xl w-full flex-grow">
      <h1 className="text-3xl font-bold text-[#111827] mb-6">Timeline</h1>

      <div className="mb-8">
        <select 
          className="select select-bordered w-full max-w-xs bg-white border-gray-200 text-gray-700"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No interactions found for this filter.</p>
        ) : (
          filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#f8fafc] rounded-full flex items-center justify-center shrink-0">
                {getEventIcon(event.type)}
              </div>
              
              <div className="flex flex-col">
                <p className="text-gray-800 text-sm md:text-base">
                  <strong className="text-[#1A4731] font-semibold">{event.type}</strong> with {event.friendName}
                </p>
                <p className="text-xs text-gray-400 font-medium">{event.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}