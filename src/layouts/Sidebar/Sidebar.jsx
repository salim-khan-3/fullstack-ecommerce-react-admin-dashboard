// Sidebar.jsx
import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  LogIn,
  UserPlus,
  LogOut,
  ChevronRight,
  Tag,
  TrendingUp,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../../App";
import { path } from "framer-motion/client";

const Sidebar = () => {
  const location = useLocation();
  const { isToggleSidebar, setIsToggleSidebar } = useContext(MyContext);

  const isOpen = isToggleSidebar;

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/" },
    {
      icon: <ShoppingCart size={18} />,
      label: "Home Banner Slides",
      hasArrow: true,
      path: "/homebanner",
    },
    {
      icon: <ShoppingBag size={18} />,
      label: "Products",
      hasArrow: true,
      submenu: [
        { label: "Product List", path: "/products/list" },
        { label: "Product Upload", path: "/product/upload" },
        { label: "Add Product RAMS", path: "/productrams/add" },
        { label: "Product RAMS", path: "/productrams/list" },
        { label: "Add Product WEIGHT", path: "/productweight/add" },
        { label: "Product WEIGHT", path: "/productweight/list" },
        { label: "Add Product SIZE", path: "/productsize/add" },
        { label: "Product SIZE", path: "/productsize/list" },
      ],
    },
    {
      icon: <Tag size={18} />,
      label: "Category",
      hasArrow: true,
      submenu: [
        { label: "Category List", path: "/category/list" },
        { label: "Add Category", path: "/category/add" },
        { label: "Sub Category List", path: "/category/subcategorylist" },
        { label: "Add Sub Category", path: "/subCategory/add" },
      ],
    },
    {
      icon: <ShoppingCart size={18} />,
      label: "Orders",
      hasArrow: true,
      path: "/orders",
    },
    { icon: <TrendingUp size={18} />, label: "Analytics", path: "/analytics" },
  ];

  const authItems = [
    {
      icon: <LogIn size={18} />,
      label: "Login",
      hasArrow: true,
      submenu: [
        { label: "Admin Login", path: "/login/admin" },
        { label: "User Login", path: "/login/user" },
      ],
    },
    {
      icon: <UserPlus size={18} />,
      label: "Sign Up",
      hasArrow: true,
      submenu: [{ label: "Register", path: "/signup" }],
    },
  ];

  return (
    <>
      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsToggleSidebar(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <motion.aside
        initial={false}
        animate={{
          width: isOpen ? 256 : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed lg:sticky top-0 left-0 h-screen z-40 overflow-hidden bg-white border-r border-gray-100 shadow-xl lg:shadow-none flex flex-col flex-shrink-0"
      >
        {/* Inner wrapper — fixed width যাতে animate করলেও content squish না হয় */}
        <div className="w-64 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-xs">H</span>
              </div>
              <span className="font-black text-base tracking-tight text-gray-800 whitespace-nowrap">
                HOT<span className="text-blue-600">ASH</span>
              </span>
            </div>
            <button
              onClick={() => setIsToggleSidebar(false)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Menu */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-1">
            <p className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 whitespace-nowrap">
              Main Menu
            </p>

            {menuItems.map((item, index) => (
              <SidebarItem
                key={index}
                {...item}
                active={location.pathname === item.path}
                currentPath={location.pathname}
              />
            ))}

            <div className="pt-4 mt-2 border-t border-gray-100">
              <p className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 whitespace-nowrap">
                Authentication
              </p>
              {authItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  {...item}
                  currentPath={location.pathname}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-3">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://i.pravatar.cc/150?u=rinku"
                  alt=""
                  className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-sm flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">
                    Rinku Verma
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">
                    @Rinkuv37 · Admin
                  </p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-200/50 active:scale-95 whitespace-nowrap">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// ── SidebarItem ──
const SidebarItem = ({
  icon,
  label,
  hasArrow,
  submenu,
  path,
  active,
  currentPath,
}) => {
  const hasSubmenu = submenu && submenu.length > 0;
  const isSubmenuActive =
    hasSubmenu && submenu.some((s) => s.path === currentPath);
  const [isOpen, setIsOpen] = useState(isSubmenuActive);

  const base =
    "group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 w-full text-left whitespace-nowrap";
  const activeClass = "bg-blue-600 text-white shadow-md shadow-blue-200";
  const inactiveClass = "text-gray-600 hover:bg-gray-100 hover:text-blue-600";
  const openClass = "bg-blue-50 text-blue-600";

  const content = (
    <>
      <div className="flex items-center gap-3">
        <span
          className={`transition-colors flex-shrink-0 ${active ? "text-white" : isOpen ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`}
        >
          {icon}
        </span>
        <span className="text-sm font-semibold">{label}</span>
      </div>
      {hasArrow && (
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight
            size={14}
            className={
              active
                ? "text-white/70"
                : "text-gray-400 group-hover:text-blue-600"
            }
          />
        </motion.div>
      )}
    </>
  );

  return (
    <div className="mb-0.5">
      {hasSubmenu ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${base} ${isOpen && !active ? openClass : !active ? inactiveClass : activeClass}`}
        >
          {content}
        </div>
      ) : (
        <Link
          to={path}
          className={`${base} ${active ? activeClass : inactiveClass}`}
        >
          {content}
        </Link>
      )}

      <AnimatePresence>
        {isOpen && hasSubmenu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-1 ml-4 pl-4 border-l-2 border-blue-100 space-y-0.5"
          >
            {submenu.map((subItem, idx) => (
              <Link
                key={idx}
                to={subItem.path}
                className={`flex items-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  currentPath === subItem.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-600 hover:bg-blue-50/50"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${currentPath === subItem.path ? "bg-blue-600" : "bg-gray-300"}`}
                />
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
