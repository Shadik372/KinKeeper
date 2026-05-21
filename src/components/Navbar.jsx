'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaClock, FaChartLine } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
  { text: 'Home', href: '/', icon: <FaHome /> },
  { text: 'Timeline', href: '/timeline', icon: <FaClock /> },
  { text: 'Stats', href: '/stats', icon: <FaChartLine /> },
];

  return (
    <div className="navbar bg-white py-4 border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center w-full">
        
        <div className="flex-none">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-sans tracking-tight">
              <strong className="text-[#111827]">Keen</strong>
              <span className="text-[#1A4731] font-semibold">Keeper</span>
            </span>
          </Link>
        </div>

        <div className="flex-none">
          <ul className="flex items-center gap-2 p-0 m-0 list-none">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-5 py-2 rounded-md transition-all duration-200 font-medium text-sm no-underline ${
                      isActive 
                        ? 'bg-[#1A4731] text-white shadow-sm' 
                        : 'text-[#4B5563] hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;