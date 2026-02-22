import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import {
  Search,
  Sun,
  ShoppingCart,
  Mail,
  Bell,
  Menu,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const { isToggleSidebar, setIsToggleSidebar, isLoggedIn, setIsLoggedIn } = useContext(MyContext);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
 

  // Dummy notification data based on your screenshot
  const notifications = [
    {
      id: 1,
      name: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
      time: "few seconds ago",
    },
    {
      id: 2,
      name: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
      time: "few seconds ago",
    },
    {
      id: 3,
      name: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
      time: "few seconds ago",
    },
    {
      id: 4,
      name: "Mahmudul",
      action: "added to his favorite list",
      item: "Leather belt steve madden",
      time: "few seconds ago",
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* Left Section: Logo & Toggle */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <div className="w-5 h-5 border-2 border-white rounded-sm flex items-center justify-center text-white font-bold text-xs">
              H
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800">
            HOTASH
          </span>
        </div>

        <button
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 md:block"
          onClick={() => setIsToggleSidebar(!isToggleSidebar)}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border-none bg-blue-50/50 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search here..."
          />
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center space-x-1 md:space-x-3">
        {/* Action Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2 border-r pr-3 mr-2 border-gray-100">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Sun size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Mail size={20} />
          </button>

          {/* Notification Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`p-2 rounded-full transition-colors ${isNotificationOpen ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
            >
              <Bell size={20} />
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-gray-50">
                  <h3 className="font-semibold text-gray-700">Orders (12)</h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif, index) => (
                    <div
                      key={index}
                      className="flex items-start p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                    >
                      <img
                        src="https://i.pravatar.cc/150?u=rinku"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover mr-3 border border-gray-200"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-bold text-gray-900">
                            {notif.name}
                          </span>{" "}
                          {notif.action}
                          <span className="block font-semibold text-gray-800">
                            {notif.item}
                          </span>
                        </p>
                        <p className="text-xs text-blue-500 mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-white">
                  <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/150?u=rinku"
              alt="Rinku Verma"
              className="w-9 h-9 rounded-full border border-gray-200"
            />
            <div className="hidden lg:block leading-tight">
              <p className="text-sm font-bold text-gray-800">Rinku Verma</p>
              <p className="text-[11px] text-gray-500">@Rinkuv37</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsLoggedIn(isLoggedIn)} // dummy login toggle
            className="py-1.5 px-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
