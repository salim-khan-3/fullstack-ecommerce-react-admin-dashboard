
import "react-inner-image-zoom/lib/styles.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Header/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import { createContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

export const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHideSidebarAndNavbar, setIsHideSidebarAndNavbar] = useState(false);
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
   document.body.classList.remove("light")
   document.body.classList.remove("dark")
   document.body.classList.add(themeMode);
   localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLoggedIn,
    setIsLoggedIn,
    isHideSidebarAndNavbar,
    setIsHideSidebarAndNavbar,
    
  };

  const sidebarWidth = 320;

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {/* Only show Navbar if not hidden */}
        {!isHideSidebarAndNavbar && <Navbar />}

        <div
          className={`flex w-full h-[calc(100vh-${!isHideSidebarAndNavbar ? "64px" : "0px"})] overflow-hidden bg-gray-50 transition-all duration-300`}
        >
          {/* Only show Sidebar if not hidden */}
          {!isHideSidebarAndNavbar && (
            <motion.div
              initial={false}
              animate={{
                width: isToggleSidebar ? sidebarWidth : 0,
                minWidth: isToggleSidebar ? sidebarWidth : 0,
                opacity: isToggleSidebar ? 1 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="h-full overflow-hidden border-r border-gray-100 bg-white"
            >
              <div style={{ width: sidebarWidth }}>
                <Sidebar />
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <motion.div
            layout
            className="flex-1 h-full overflow-y-auto"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
          >
            <div className="p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/details" element={<ProductDetails />} />
              </Routes>
            </div>
          </motion.div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./layouts/Header/Navbar";
// import Sidebar from "./layouts/Sidebar/Sidebar";
// import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
// import { createContext, useState } from "react";
// import { motion } from "framer-motion";
// import Login from "./pages/Login/Login";

// export const MyContext = createContext();

// function App() {
//   const [isToggleSidebar, setIsToggleSidebar] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isHideSidebarAndNavbar, setIsHideSidebarAndNavbar] = useState(false);

//   const values = {
//     isToggleSidebar,
//     setIsToggleSidebar,
//     isLoggedIn,
//     setIsLoggedIn,
//     isHideSidebarAndNavbar,
//     setIsHideSidebarAndNavbar,
//   };

//   // Sidebar width configuration
//   const sidebarWidth = 320;

//   return (
//     <BrowserRouter>
//       <MyContext.Provider value={values}>
//         <Navbar />

//         {/* Layout Wrapper */}
//         <div className="flex w-full h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
//           {/* Sidebar Section */}
//           <motion.div
//             initial={false}
//             animate={{
//               width: isToggleSidebar ? sidebarWidth : 0,
//               minWidth: isToggleSidebar ? sidebarWidth : 0,
//               opacity: isToggleSidebar ? 1 : 0,
//             }}
//             transition={{
//               type: "spring",
//               stiffness: 300,
//               damping: 30,
//               duration: 0.4,
//             }}
//             className="h-full overflow-hidden border-r border-gray-100 bg-white"
//           >
//             {/* Sidebar content container to prevent text wrapping during transition */}
//             <div style={{ width: sidebarWidth }}>
//               <Sidebar />
//             </div>
//           </motion.div>

//           {/* Main Content Section */}
//           <motion.div
//             layout
//             className="flex-1 h-full overflow-y-auto"
//             transition={{
//               type: "spring",
//               stiffness: 300,
//               damping: 30,
//               duration: 0.4,
//             }}
//           >
//             <div className="p-6">
//               <Routes>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/login" element={<Login />} />
//               </Routes>
//             </div>
//           </motion.div>
//         </div>
//       </MyContext.Provider>
//     </BrowserRouter>
//   );
// }

// export default App;
