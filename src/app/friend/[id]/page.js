'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaRegClock, FaArchive, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

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

  const handleCheckIn = (type) => {
    if (!friend) return; 
    
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
    return <div className="text-center py-20 text-2xl font-bold">Friend not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl w-full">
      

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 mb-4 overflow-hidden rounded-full ring-2 ring-gray-100">
              <img src={friend.picture} alt={friend.name} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{friend.name}</h2>
            
            <span className={`px-4 py-1 text-xs font-semibold rounded-full capitalize mb-3 ${getStatusStyle(friend.status)}`}>
              {friend.status.replace('-', ' ')}
            </span>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {friend.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wide bg-[#e6f4ea] text-[#1A4731] rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500 italic mb-4">"{friend.bio}"</p>
            <p className="text-xs text-gray-400">Preferred: <a href={`mailto:${friend.email}`} className="text-[#1A4731] hover:underline">{friend.email}</a></p>
          </div>

          <button className="w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700 shadow-sm">
            <FaRegClock className="text-lg" /> Snooze 2 Weeks
          </button>
          
          <button className="w-full py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700 shadow-sm">
            <FaArchive className="text-lg text-gray-500" /> Archive
          </button>
          
          <button className="w-full py-3 bg-white border border-red-100 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-[#ff4d4f] shadow-sm">
            <FaRegTrashAlt className="text-lg" /> Delete
          </button>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-[#1A4731] mb-1">{friend.days_since_contact}</span>
              <span className="text-xs text-gray-400 font-medium">Days Since Contact</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-[#1A4731] mb-1">{friend.goal}</span>
              <span className="text-xs text-gray-400 font-medium">Goal (Days)</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-[#1A4731] mb-1">Feb 27, 2026</span>
              <span className="text-xs text-gray-400 font-medium">Next Due</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-[#1A4731] font-semibold text-lg mb-1">Relationship Goal</h3>
              <p className="text-sm text-gray-500">Connect every <strong className="text-gray-900">{friend.goal} days</strong></p>
            </div>
            <button className="px-4 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-md text-sm hover:bg-gray-100 transition-colors">
              Edit
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-[#1A4731] font-semibold text-lg mb-4">Quick Check-In</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => handleCheckIn('Call')} className="flex-1 py-8 bg-[#f8fafc] hover:bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-3 border border-gray-100 transition-all hover:-translate-y-1">
                <img src="/assets/call.png" alt="Call" className="w-8 h-8 opacity-80" />
                <span className="text-sm font-medium text-gray-700">Call</span>
              </button>
              
              <button onClick={() => handleCheckIn('Text')} className="flex-1 py-8 bg-[#f8fafc] hover:bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-3 border border-gray-100 transition-all hover:-translate-y-1">
                <img src="/assets/text.png" alt="Text" className="w-8 h-8 opacity-80" />
                <span className="text-sm font-medium text-gray-700">Text</span>
              </button>
              
              <button onClick={() => handleCheckIn('Video')} className="flex-1 py-8 bg-[#f8fafc] hover:bg-gray-100 rounded-xl flex flex-col items-center justify-center gap-3 border border-gray-100 transition-all hover:-translate-y-1">
                <img src="/assets/video.png" alt="Video" className="w-8 h-8 opacity-80" />
                <span className="text-sm font-medium text-gray-700">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}