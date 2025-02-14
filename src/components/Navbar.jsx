import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);

  return (
    <nav className="fixed w-full top-6 px-6 z-50">
      <div className="max-w-[1480px] mx-auto relative">
        {/* Main Navigation Container */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 w-[200px]">
            <a
              href="#"
              className="flex items-center space-x-3 p-3 rounded-[2.5rem] relative group hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logo}
                alt="Pure Insight Logo"
                className="h-[52px] w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Middle Navigation Section */}
          <div className="flex-grow mx-8">
            <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-[70.5rem] py-3 px-4 shadow-lg">
              <div className="flex items-center justify-center space-x-2 px-6">
                {[
                  'Services',
                  'Plan',
                  'About Us',
                  'InsightBuddy',
                  'Blog',
                  'FAQ',
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="relative px-6 py-2.5 text-gray-800 text-[20px] font-medium rounded-[2.5rem] transition-all duration-300 hover:bg-white/20 hover:shadow-md hover:text-[#93AED4] group whitespace-nowrap"
                  >
                    {item}
                    <span className="absolute bottom-1.5 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-[#93AED4] to-transparent transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Profile and Scan Button Section */}
          <div className="flex-shrink-0 w-[360px] flex items-center justify-end space-x-4">
            {/* Profile Button */}
            <div className="relative">
              {/* Profile button content */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 bg-[#386614] px-6 py-3 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden group"
              >
                {/* Previous profile button content remains the same */}
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-white font-medium text-[20px]">Profile</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-white transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Profile dropdown remains the same */}
            </div>

            {/* Scan Button */}
            <div className="relative">
              <button
                onClick={() => setIsScanOpen(!isScanOpen)}
                className="flex items-center space-x-3 bg-[#386614] px-6 py-3 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg overflow-hidden group"
              >
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-white">
                    <path fill="currentColor" d="M4 14.5A1.5 1.5 0 0 1 5.5 16v2.5H9a1.5 1.5 0 0 1 0 3H5A2.5 2.5 0 0 1 2.5 19v-3A1.5 1.5 0 0 1 4 14.5Zm16 0a1.5 1.5 0 0 1 1.493 1.356L21.5 16v3a2.5 2.5 0 0 1 -2.336 2.495L19 21.5h-4a1.5 1.5 0 0 1 -0.144 -2.993L15 18.5h3.5V16a1.5 1.5 0 0 1 1.5 -1.5Z" />
                  </svg>
                </div>
                <span className="text-white font-medium text-[20px]">Scan</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-white transition-transform duration-300 ${isScanOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {/* Scan dropdown remains the same */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;