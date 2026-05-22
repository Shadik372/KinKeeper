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
      case 'Call': return <img src="/assets/call.png" alt="Call" className="w-5 h-5 md:w-6 md:h-6 object-contain" />;
      case 'Text': return <img src="/assets/text.png" alt="Text" className="w-5 h-5 md:w-6 md:h-6 object-contain" />;
      case 'Video': return <img src="/assets/video.png" alt="Video" className="w-5 h-5 md:w-6 md:h-6 object-contain" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-10 max-w-4xl w-full flex-grow">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-5 md:mb-6">Timeline</h1>

      {/* Filter — full width on mobile, constrained on larger screens */}
      <div className="mb-6 md:mb-8">
        <select
          className="select select-bordered w-full sm:w-auto sm:min-w-[200px] bg-white border-gray-200 text-gray-700 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">Filter timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-10 text-sm md:text-base">No interactions found for this filter.</p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 md:gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f8fafc] rounded-full flex items-center justify-center shrink-0">
                {getEventIcon(event.type)}
              </div>

              <div className="flex flex-col min-w-0">
                <p className="text-gray-800 text-sm md:text-base truncate">
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
