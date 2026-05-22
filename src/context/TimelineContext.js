'use client';

import { createContext, useContext, useState } from 'react';

const TimelineContext = createContext();

export const TimelineProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (type, friendName) => {
    const newEvent = {
      id: Date.now(), 
      type,
      friendName,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  return (
    <TimelineContext.Provider value={{ events, addEvent }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => useContext(TimelineContext); 