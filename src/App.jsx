import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Header/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import { createContext, useState } from "react";
import { motion } from "framer-motion";

export const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(true); // Default open rakhlam smooth feeler jonno

  const values = { isToggleSidebar, setIsToggleSidebar };

  // Sidebar width configuration
  const sidebarWidth = 320; 

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Navbar />

        {/* Layout Wrapper */}
        <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
          
          {/* Sidebar Section */}
          <motion.div
            initial={false}
            animate={{ 
              width: isToggleSidebar ? sidebarWidth : 0,
              minWidth: isToggleSidebar ? sidebarWidth : 0,
              opacity: isToggleSidebar ? 1 : 0
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30, 
              duration: 0.4 
            }}
            className="h-full overflow-hidden border-r border-gray-100 bg-white"
          >
            {/* Sidebar content container to prevent text wrapping during transition */}
            <div style={{ width: sidebarWidth }}>
              <Sidebar />
            </div>
          </motion.div>

          {/* Main Content Section */}
          <motion.div
            layout
            className="flex-1 h-full overflow-y-auto"
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4 
            }}
          >
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </motion.div>
          
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;