// components/Sidebar.tsx
'use client'
import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-gray-800 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 text-white">
  
          <button className="lg:hidden" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4 text-white flex flex-col gap-4 ml-3 text-2xl">
          <Link href="/home" className="flex items-center gap-2 text-white hover:text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v18" />
            </svg>
            Home
          </Link>
          <Link href="/userdata" className="flex items-center gap-2 text-white hover:text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 13h18M5 21h14a2 2 0 002-2V10a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z" />
            </svg>
            Uers Data
          </Link>

        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
