// components/Navbar.tsx
import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <button onClick={toggleSidebar} className="p-2 text-white bg-gray-800 lg:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex flex-row justify-between lg:flex lg:justify-between w-full">
          <h1 className="text-white text-xl font-bold">BigFive</h1>
          {/* <ul className="hidden lg:flex space-x-8">
              <li>
                <Link href="/home" className="text-white hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white hover:text-gray-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white hover:text-gray-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white hover:text-gray-400">
                  Contact
                </Link>
              </li>
            </ul> */}
          <div className="lg:flex lg:flex-row lg:gap-6">
          
            <div className="relative">
              <img
                onClick={handleDropdownToggle}
                className="inline-block w-8 h-8 rounded-full ring-2 ring-white cursor-pointer"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
              />
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <li>
                    <Link href="/profile"  onClick={handleDropdownClose} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-3.314 0-6 2.686-6 6v1h12v-1c0-3.314-2.686-6-6-6z" />
                      </svg>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings"  onClick={handleDropdownClose} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 3.75L8 6.5M15.75 3.75L17.5 6.5M9.75 20.25L8 17.5M15.75 20.25L17.5 17.5M3.75 9.75L6.5 8M20.25 9.75L17.5 8M3.75 14.25L6.5 16M20.25 14.25L17.5 16M12 15V9M12 6a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link href="/logout"  onClick={handleDropdownClose} className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
