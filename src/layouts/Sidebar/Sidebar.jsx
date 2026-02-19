import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, ShoppingBag, ShoppingCart,
  MessageSquare, Bell, Settings, LogIn,
  UserPlus, LogOut, ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: "Dashboard", 
      active: true,
      submenu: ["Analytics", "Statistics"] 
    },
    { 
      icon: <ShoppingBag size={20} />, 
      label: "Products", 
      hasArrow: true,
      submenu: ["Product List", "Product View", "Product Upload"] 
    },
    { 
      icon: <ShoppingCart size={20} />, 
      label: "Orders", 
      hasArrow: true,
      submenu: ["Pending Orders", "Completed", "Returns"] 
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: "Messages", 
      hasArrow: true,
      submenu: ["Inbox", "Sent Messages", "Archived"] 
    },
    { 
      icon: <Bell size={20} />, 
      label: "Notifications", 
      hasArrow: true,
      submenu: ["All Alerts", "Promotions"] 
    },
    { 
      icon: <Settings size={20} />, 
      label: "Settings", 
      hasArrow: true,
      submenu: ["Profile Setup", "Privacy", "API Keys"] 
    },
  ];

  // এই অংশটি আগে মিসিং ছিল
  const authItems = [
    { icon: <LogIn size={20} />, label: "Login", submenu: ["Admin Login", "User Login"] },
    { icon: <UserPlus size={20} />, label: "Sign Up", submenu: ["Register", "Forgot Password"] },
  ];

  return (
    <aside className=" h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col p-4 transition-colors duration-300">
      
      <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        {/* Main Menu Section */}
        {menuItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}

        {/* Auth Section (Login and Sign Up) - এখন এটি দেখা যাবে */}
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800 space-y-1">
          {authItems.map((item, index) => (
            <SidebarItem key={index} {...item} hasArrow={true} />
          ))}
        </div>

        {/* Extra Section */}
        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800 space-y-1">
           <SidebarItem icon={<ShoppingCart size={20} />} label="Orders" hasArrow={true} submenu={["New", "History"]} />
           <SidebarItem icon={<MessageSquare size={20} />} label="Messages" hasArrow={true} submenu={["Inbox", "Drafts"]} />
           <SidebarItem icon={<Bell size={20} />} label="Notifications" hasArrow={true} submenu={["Recent"]} />
           <SidebarItem icon={<Settings size={20} />} label="Settings" hasArrow={true} submenu={["Global"]} />
        </div>
      </div>

      {/* Logout Card */}
      <div className="mt-auto pt-6">
        <div className="relative overflow-hidden bg-blue-100 dark:bg-blue-900/30 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-400/30 rounded-full"></div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/20 rounded-full"></div>
          <button className="relative z-10 flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-md shadow-blue-200 dark:shadow-none">
            <LogOut size={18} /> LOGOUT
          </button>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, hasArrow, submenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = submenu && submenu.length > 0;

  return (
    <div className="mb-1">
      <div 
        onClick={() => hasSubmenu && setIsOpen(!isOpen)}
        className={`
          group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all
          ${active && !isOpen
            ? 'bg-gray-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-blue-600'}
          ${isOpen ? 'bg-gray-50/80 dark:bg-slate-800/40 text-blue-600' : ''}
        `}
      >
        <div className="flex items-center gap-3">
          <span className={`${active || isOpen ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
            {icon}
          </span>
          <span className="text-sm font-medium">{label}</span>
        </div>
        
        {hasArrow && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={16} className={`${isOpen ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasSubmenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-l-2 border-gray-100 dark:border-slate-800 ml-5 mt-1"
          >
            {submenu.map((subItem, idx) => (
              <div 
                key={idx} 
                className="py-2 pl-6 pr-3 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
              >
                {subItem}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;