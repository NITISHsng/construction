import React,{ useState, useRef, useEffect } from 'react';
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
import { Link } from 'react-router-dom';
export default function Header() {
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 py-2 px-4">
      <div className="flex items-center justify-between">

        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              placeholder="Search..."
              className="w-full bg-gray-50 border border-gray-300 rounded-md pl-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 ml-4">
          
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                {unreadNotifications}
              </span>
            )}
          </button>

          {/* Settings */}
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <Settings className="h-5 w-5" />
          </button>

          {/* Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-8 w-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center"
            >
              JD
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-50">
                <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
                  My Account
                </div>
                <ul className="py-1">
                  <li>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </button>
                  </li>
                  <hr className="my-1" />
                  <li>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
