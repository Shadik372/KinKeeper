'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaHome, FaClock, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { text: 'Home', href: '/', icon: <FaHome /> },
    { text: 'Timeline', href: '/timeline', icon: <FaClock /> },
    { text: 'Stats', href: '/stats', icon: <FaChartLine /> },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 w-full">
      <div className="container mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center w-full">

        <div className="flex-none">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl md:text-2xl font-sans tracking-tight">
              <strong className="text-[#111827]">Keen</strong>
              <span className="text-[#1A4731] font-semibold">Keeper</span>
            </span>
          </Link>
        </div>

        <div className="hidden sm:flex flex-none">
          <ul className="flex items-center gap-1 md:gap-2 p-0 m-0 list-none">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 rounded-md transition-all duration-200 font-medium text-sm no-underline ${
                      isActive
                        ? 'bg-[#1A4731] text-white shadow-sm'
                        : 'text-[#4B5563] hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-base md:text-lg">{link.icon}</span>
                    <span className="hidden md:inline">{link.text}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.text}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 font-medium text-sm no-underline ${
                  isActive
                    ? 'bg-[#1A4731] text-white'
                    : 'text-[#4B5563] hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.text}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
