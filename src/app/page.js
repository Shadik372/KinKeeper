'use client';

import { useState, useEffect } from "react";
import Banner from "@/components/Banner";
import FriendCard from "@/components/FriendCard"; 

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/friends.json');
        const data = await response.json();
        
        setTimeout(() => {
          setFriends(data);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="flex flex-col items-center w-full pb-20">
      <Banner />
      
      <div className="w-full max-w-[1200px] mt-8 px-4">
        <h2 className="text-2xl font-bold text-[#1e293b] mb-6 pl-2">Your Friends</h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 w-full">
            <span className="loading loading-spinner loading-lg text-[#1A4731]"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}