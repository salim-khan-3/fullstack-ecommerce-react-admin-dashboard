import "react-inner-image-zoom/lib/styles.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Header/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import { createContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ProductDetails from "./pages/Products/ProductDetails/ProductDetails";
import ProductUpload from "./pages/Products/ProductUpload/ProductUpload";
import CategoryForm from "./pages/Category/AddCategory/AddCategory";
import { Toaster } from "react-hot-toast";
import CategoryList from "./pages/Category/CategoryList/CategoryList";
import EditCategory from "./pages/Category/Editcategory/Editcategory";
import ProductList from "./pages/Products/ProductList/ProductList";

export const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHideSidebarAndNavbar, setIsHideSidebarAndNavbar] = useState(false);
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

  const sidebarWidth = 260; // আপনার সাইডবারের উইডথ অনুযায়ী সেট করুন

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Toaster position="top-right" />
        
        {/* Navbar fixed থাকবে */}
        {!isHideSidebarAndNavbar && <Navbar />}

        <div className="flex w-full min-h-screen bg-gray-50">
          
          {/* Sidebar Section */}
          {!isHideSidebarAndNavbar && (
            <>
              {/* Mobile Overlay */}
              {isMobile && isToggleSidebar && (
                <div
                  className="fixed inset-0 bg-black/40 z-[60]"
                  onClick={() => setIsToggleSidebar(false)}
                />
              )}

              <motion.div
                initial={false}
                animate={{
                  width: isToggleSidebar ? sidebarWidth : 0,
                  x: isMobile ? (isToggleSidebar ? 0 : -sidebarWidth) : 0,
                }}
                className={`
                  bg-white border-r border-gray-100 shadow-sm
                  ${isMobile ? "fixed left-0 top-0 h-full z-[70]" : "sticky top-0 h-screen"}
                  overflow-hidden
                `}
              >
                <Sidebar />
              </motion.div>
            </>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <main className="p-4 md:p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products/list" element={<ProductList />} />
                <Route path="/product/details" element={<ProductDetails />} />
                <Route path="/product/upload" element={<ProductUpload />} />
                <Route path="/category/add" element={<CategoryForm />} />
                <Route path="/category/list" element={<CategoryList />} />
                <Route path="/dashboard/categories/edit/:id" element={<EditCategory />} />
              </Routes>
            </main>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;