'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaRegClock, FaArchive, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useTimeline } from '@/context/TimelineContext';

export default function FriendDetails() {
  const params = useParams();
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await fetch('/friends.json');
        const data = await response.json();
        const foundFriend = data.find((f) => f.id.toString() === params.id);
        setFriend(foundFriend);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load friend:", error);
        setLoading(false);
      }
    };
    fetchFriend();
  }, [params.id]);

  const { addEvent } = useTimeline();

  const handleCheckIn = (type) => {
    if (!friend) return;
    addEvent(type, friend.name);
    toast.success(`Successfully logged a ${type} with ${friend.name}!`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'overdue': return 'bg-[#ff4d4f] text-white';
      case 'almost due': return 'bg-[#facc15] text-white';
      case 'on-track': return 'bg-[#1A4731] text-white';
      default: return 'bg-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 w-full flex-grow">
        <span className="loading loading-spinner loading-lg text-[#1A4731]"></span>
      </div>
    );
  }

  if (!friend) {
    return <div className="text-center py-20 text-xl md:text-2xl font-bold">Friend not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-6 md:py-8 max-w-6xl w-full">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">

        {/* Left Column — Profile Card + Actions */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 p-6 md:p-8 flex flex-col items-center text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 mb-3 md:mb-4 overflow-hidden rounded-full ring-2 ring-gray-100">
              <img src={friend.picture} alt={friend.name} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{friend.name}</h2>

            <span className={`px-4 py-1 text-xs font-semibold rounded-full capitalize mb-3 ${getStatusStyle(friend.status)}`}>
              {friend.status.replace('-', ' ')}
            </span>

            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
              {friend.tags.map((tag, idx) => (
                <span key={idx} className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] font-bold uppercase tracking-wide bg-[#e6f4ea] text-[#1A4731] rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500 italic mb-3 md:mb-4">"{friend.bio}"</p>
            <p className="text-xs text-gray-400">
              Preferred: <a href={`mailto:${friend.email}`} className="text-[#1A4731] hover:underline break-all">{friend.email}</a>
            </p>
          </div>

          {/* Action buttons — row on mobile, stacked on lg+ */}
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 md:gap-3">
            <button className="w-full py-2.5 md:py-3 bg-white border border-gray-200 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 md:gap-2 text-gray-700 shadow-sm">
              <FaRegClock className="text-base md:text-lg shrink-0" />
              <span className="hidden sm:inline md:hidden lg:inline">Snooze 2 Weeks</span>
              <span className="sm:hidden md:inline lg:hidden">Snooze</span>
            </button>

            <button className="w-full py-2.5 md:py-3 bg-white border border-gray-200 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 md:gap-2 text-gray-700 shadow-sm">
              <FaArchive className="text-base md:text-lg text-gray-500 shrink-0" />
              <span className="hidden sm:inline">Archive</span>
            </button>

            <button className="w-full py-2.5 md:py-3 bg-white border border-red-100 rounded-lg text-xs md:text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5 md:gap-2 text-[#ff4d4f] shadow-sm">
              <FaRegTrashAlt className="text-base md:text-lg shrink-0" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-6">

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-2xl md:text-3xl font-bold text-[#1A4731] mb-0.5 md:mb-1">{friend.days_since_contact}</span>
              <span className="text-[9px] md:text-xs text-gray-400 font-medium leading-tight">Days Since Contact</span>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-2xl md:text-3xl font-bold text-[#1A4731] mb-0.5 md:mb-1">{friend.goal}</span>
              <span className="text-[9px] md:text-xs text-gray-400 font-medium leading-tight">Goal (Days)</span>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-sm md:text-xl font-bold text-[#1A4731] mb-0.5 md:mb-1 leading-tight">Feb 27, 2026</span>
              <span className="text-[9px] md:text-xs text-gray-400 font-medium leading-tight">Next Due</span>
            </div>
          </div>

          {/* Goal row */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex justify-between items-center gap-4">
            <div>
              <h3 className="text-[#1A4731] font-semibold text-base md:text-lg mb-0.5 md:mb-1">Relationship Goal</h3>
              <p className="text-xs md:text-sm text-gray-500">Connect every <strong className="text-gray-900">{friend.goal} days</strong></p>
            </div>
            <button className="shrink-0 px-3 md:px-4 py-1 md:py-1.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-md text-xs md:text-sm hover:bg-gray-100 transition-colors">
              Edit
            </button>
          </div>

          {/* Check-in */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-[#1A4731] font-semibold text-base md:text-lg mb-3 md:mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <button
                onClick={() => handleCheckIn('Call')}
                className="py-5 md:py-8 bg-[#f8fafc] hover:bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-3 border border-gray-100 transition-all hover:-translate-y-1"
              >
                <img src="/assets/call.png" alt="Call" className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                <span className="text-xs md:text-sm font-medium text-gray-700">Call</span>
              </button>

              <button
                onClick={() => handleCheckIn('Text')}
                className="py-5 md:py-8 bg-[#f8fafc] hover:bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-3 border border-gray-100 transition-all hover:-translate-y-1"
              >
                <img src="/assets/text.png" alt="Text" className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                <span className="text-xs md:text-sm font-medium text-gray-700">Text</span>
              </button>

              <button
                onClick={() => handleCheckIn('Video')}
                className="py-5 md:py-8 bg-[#f8fafc] hover:bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 md:gap-3 border border-gray-100 transition-all hover:-translate-y-1"
              >
                <img src="/assets/video.png" alt="Video" className="w-6 h-6 md:w-8 md:h-8 opacity-80" />
                <span className="text-xs md:text-sm font-medium text-gray-700">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
