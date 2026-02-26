import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  MessageSquare,
  Bell,
  Settings,
  LogIn,
  UserPlus,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
       hasArrow: true,
      submenu: ["Analytics", "Statistics"],
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Products",
      hasArrow: true,
      submenu: [
        { label: "Product List", path: "/dashboard" },
        { label: "Product View", path: "/product/details" },
        { label: "Product Upload", path: "/product/upload" },
      ],
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Categoey",
      hasArrow: true,
      submenu: [
        // { label: "Product List", path: "/dashboard" },
        // { label: "Product View", path: "/product/details" },
        { label: "Category Upload", path: "/category/add" },
      ],
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Orders",
      hasArrow: true,
      submenu: ["Pending Orders", "Completed", "Returns"],
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Messages",
      hasArrow: true,
      submenu: ["Inbox", "Sent Messages", "Archived"],
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      hasArrow: true,
      submenu: ["All Alerts", "Promotions"],
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      hasArrow: true,
      submenu: ["Profile Setup", "Privacy", "API Keys"],
    },
  ];

  const authItems = [
    {
      icon: <LogIn size={20} />,
      label: "Login",
      submenu: ["Admin Login", "User Login"],
    },
    {
      icon: <UserPlus size={20} />,
      label: "Sign Up",
      submenu: ["Register", "Forgot Password"],
    },
  ];

  return (
    <aside className="h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col p-4">
      <div className="flex-1 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}

        <div className="pt-4 mt-4 border-t border-gray-200 space-y-1">
          {authItems.map((item, index) => (
            <SidebarItem key={index} {...item} hasArrow={true} />
          ))}
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200 space-y-1">
          <SidebarItem
            icon={<ShoppingCart size={20} />}
            label="Orders"
            hasArrow={true}
            submenu={["New", "History"]}
          />
          <SidebarItem
            icon={<MessageSquare size={20} />}
            label="Messages"
            hasArrow={true}
            submenu={["Inbox", "Drafts"]}
          />
          <SidebarItem
            icon={<Bell size={20} />}
            label="Notifications"
            hasArrow={true}
            submenu={["Recent"]}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            label="Settings"
            hasArrow={true}
            submenu={["Global"]}
          />
        </div>
      </div>

      <div className="mt-auto pt-6">
        <div className="relative overflow-hidden bg-blue-100 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
          <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-md">
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
          ${
            active && !isOpen
              ? "bg-gray-100 text-blue-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
          }
          ${isOpen ? "bg-gray-50 text-blue-600" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          <span
            className={`${active || isOpen ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`}
          >
            {icon}
          </span>
          <span className="text-sm font-medium">{label}</span>
        </div>

        {hasArrow && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight
              size={16}
              className="text-gray-500 group-hover:text-blue-600"
            />
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && hasSubmenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-l-2 border-gray-200 ml-5 mt-1"
          >
            {submenu.map((subItem, idx) => (
              <Link
                key={idx}
                to={subItem.path} 
                className="block py-2 pl-6 pr-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-r-lg cursor-pointer transition-colors"
              >
                {subItem.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
