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
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/", 
      hasArrow: false,
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Products",
      hasArrow: true,
      submenu: [
        { label: "Product List", path: "/products/list" },
        { label: "Product View", path: "/product/details" },
        { label: "Product Upload", path: "/product/upload" },
      ],
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Category",
      hasArrow: true,
      submenu: [
        { label: "Category List", path: "/category/list" },
        { label: "Add Category", path: "/category/add" },
      ],
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Orders",
      hasArrow: true,
      submenu: [
        { label: "Pending Orders", path: "/orders/pending" },
        { label: "Completed", path: "/orders/completed" },
      ],
    },
  ];

  const authItems = [
    {
      icon: <LogIn size={20} />,
      label: "Login",
      hasArrow: true,
      submenu: [
        { label: "Admin Login", path: "/login/admin" },
        { label: "User Login", path: "/login/user" },
      ],
    },
    {
      icon: <UserPlus size={20} />,
      label: "Sign Up",
      hasArrow: true,
      submenu: [
        { label: "Register", path: "/signup" },
      ],
    },
  ];

  return (
    <aside className="h-screen sticky -top-20 bg-white border-r border-gray-200 flex flex-col p-4 w-64">
      <div className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
        {/* Main Menu Items */}
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index} 
            {...item} 
            active={location.pathname === item.path} 
          />
        ))}

        {/* Auth Section */}
        <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
          <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Authentication</p>
          {authItems.map((item, index) => (
            <SidebarItem key={index} {...item} />
          ))}
          
          {/* Logout Section - এখন এটি সরাসরি সাইনআপ এর নিচে থাকবে */}
          <div className="pt-4 mt-2">
            <div className="bg-blue-50 rounded-2xl p-2">
              <button className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-95">
                <LogOut size={18} /> LOGOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, hasArrow, submenu, path, active }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = submenu && submenu.length > 0;

  const ItemContainer = ({ children, isLink }) => {
    const className = `
      group flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
      ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"}
      ${isOpen ? "bg-gray-50 text-blue-600" : ""}
    `;

    if (isLink) {
      return <Link to={path} className={className}>{children}</Link>;
    }
    return <div onClick={() => hasSubmenu && setIsOpen(!isOpen)} className={className}>{children}</div>;
  };

  return (
    <div className="mb-1">
      <ItemContainer isLink={!hasSubmenu && path}>
        <div className="flex items-center gap-3">
          <span className={`${active || isOpen ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`}>
            {icon}
          </span>
          <span className="text-sm font-semibold">{label}</span>
        </div>

        {hasArrow && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600" />
          </motion.div>
        )}
      </ItemContainer>

      <AnimatePresence>
        {isOpen && hasSubmenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-l-2 border-gray-200 ml-6 mt-1 space-y-1"
          >
            {submenu.map((subItem, idx) => (
              <Link
                key={idx}
                to={subItem.path}
                className="block py-2.5 pl-6 pr-3 text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-r-lg transition-colors"
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