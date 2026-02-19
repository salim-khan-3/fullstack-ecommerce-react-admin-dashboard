import React, { useState } from 'react';
import { Search, Sun, Globe, ShoppingCart, Mail, Bell, Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
      
      {/* Left Section: Logo and Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className="text-2xl font-bold text-slate-800 tracking-tight">HOTASH</span>
        </div>
        
        <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg text-gray-500">
          <Menu size={20} />
        </button>
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            className="bg-slate-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2"
            placeholder="quick finding..."
          />
        </div>
      </div>

      {/* Right Section: Icons & Profile */}
      <div className="flex items-center gap-1 md:gap-3">
        
        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-2">
          <IconButton icon={<Sun size={20} />} />
          <IconButton icon={<Globe size={20} />} />
          <IconButton icon={<ShoppingCart size={20} />} badge={12} />
          <IconButton icon={<Mail size={20} />} badge={23} />
          <IconButton icon={<Bell size={20} />} badge={34} />
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-gray-200 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
              Miron Mahmud <ChevronDown size={14} />
            </p>
            <p className="text-xs text-gray-500">@mironcoder</p>
          </div>
          <img
            src="https://via.placeholder.com/40" // এখানে আপনার ছবির লিঙ্ক দিন
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5"
          />
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-600"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar/Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 z-50 p-4 md:hidden shadow-lg">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input className="w-full bg-gray-50 border rounded-md py-2 pl-10" placeholder="Search..." />
            </div>
            <div className="flex justify-around py-2 border-t">
              <IconButton icon={<ShoppingCart size={20} />} badge={12} />
              <IconButton icon={<Mail size={20} />} badge={23} />
              <IconButton icon={<Bell size={20} />} badge={34} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Component for Icons with Badges
const IconButton = ({ icon, badge }) => (
  <button className="relative p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded-full transition-colors">
    {icon}
    {badge && (
      <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
        {badge}
      </span>
    )}
  </button>
);

export default Navbar;