import Link from 'next/link';

const FriendCard = ({ friend }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'overdue':
        return 'bg-[#ff4d4f] text-white';
      case 'almost due':
        return 'bg-[#facc15] text-white'; 
      case 'on-track':
        return 'bg-[#1A4731] text-white'; 
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <Link href={`/friend/${friend.id}`} className="block h-full group">
      <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 p-6 flex flex-col items-center justify-between h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        
        <div className="flex flex-col items-center w-full">
          <div className="w-20 h-20 mb-4 overflow-hidden rounded-full ring-2 ring-gray-100">
            <img src={friend.picture} alt={friend.name} className="object-cover w-full h-full" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-1">{friend.name}</h3>
          <p className="text-sm text-gray-400 mb-4">{friend.days_since_contact}d ago</p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {friend.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-[#e6f4ea] text-[#1A4731] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center mt-auto">
          <span className={`px-4 py-1.5 text-xs font-semibold rounded-full capitalize ${getStatusStyle(friend.status)}`}>
            {friend.status.replace('-', ' ')}
          </span>
        </div>

      </div>
    </Link>
  );
};

export default FriendCard;