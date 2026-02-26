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
import ProductUpload from "./pages/ProductUpload/ProductUpload";
import CategoryForm from "./pages/Category/AddCategory/AddCategory";
import { Toaster } from "react-hot-toast";
import CategoryList from "./pages/Category/CategoryList/CategoryList";
import EditCategory from "./pages/Category/Editcategory/Editcategory";

export const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHideSidebarAndNavbar, setIsHideSidebarAndNavbar] = useState(false);
  const [themeMode, setThemeMode] = useState("light");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLoggedIn,
    setIsLoggedIn,
    isHideSidebarAndNavbar,
    setIsHideSidebarAndNavbar,
    isMobile,
  };

  const sidebarWidth = 320;

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
         <Toaster position="top-right" />
        {/* Only show Navbar if not hidden */}
        {!isHideSidebarAndNavbar && <Navbar />}

        <div
          className={`flex w-full h-[calc(100vh-${!isHideSidebarAndNavbar ? "64px" : "0px"})] overflow-hidden bg-gray-50 transition-all duration-300`}
        >
          {/* Only show Sidebar if not hidden */}
          {/* Sidebar */}
          {!isHideSidebarAndNavbar && (
            <>
              {/* Overlay (only mobile) */}
              {isMobile && isToggleSidebar && (
                <div
                  className="fixed inset-0 bg-black/40 z-40"
                  onClick={() => setIsToggleSidebar(false)}
                />
              )}

              <motion.div
                initial={false}
                animate={{
                  x: isMobile ? (isToggleSidebar ? 0 : -sidebarWidth) : 0,
                  width: !isMobile
                    ? isToggleSidebar
                      ? sidebarWidth
                      : 0
                    : sidebarWidth,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`
        ${isMobile ? "fixed z-50 h-full" : "relative"}
        bg-white border-r border-gray-100 overflow-hidden
      `}
                style={{ width: sidebarWidth }}
              >
                <Sidebar />
              </motion.div>
            </>
          )}

          {/* Main Content */}
          <motion.div
            layout
            className={`flex-1 h-full overflow-y-auto transition-all duration-300 ${
              !isMobile && isToggleSidebar ? "ml-0" : ""
            }`}
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
                <Route path="/product/upload" element={<ProductUpload />} />
                <Route path="/category/add" element={<CategoryForm />} />
                <Route path="/category/list" element={<CategoryList />} />
                <Route path="/dashboard/categories/edit/:id" element={<EditCategory />} />
              </Routes>
            </div>
          </motion.div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
