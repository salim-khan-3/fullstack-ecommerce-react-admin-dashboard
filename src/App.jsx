import "react-inner-image-zoom/lib/styles.min.css";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Navbar from "./layouts/Header/Navbar";
import Sidebar from "./layouts/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import { createContext, useContext, useEffect, useState } from "react";
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
import { ProductProvider } from "./context/ProductContext";
import ProductUpdate from "./pages/Products/ProductUpdate/ProductUpdate";
import SubCategoryList from "./pages/Category/SubCategory/SubCategoryList";
import EditSubCategory from "./pages/Category/SubCategory/EditSubCategory";
import AddSubCategory from "./pages/Category/SubCategory/AddSubCategory";
import EditProductWeight from "./pages/Products/productweight/Editproductweight";
import ProductWeightList from "./pages/Products/productweight/Productweightlist";
import AddProductWeight from "./pages/Products/productweight/Addproductweight";
import EditProductSize from "./pages/Products/productsize/Editproductsize";
import ProductSizeList from "./pages/Products/productsize/Productsizelist";
import AddProductSize from "./pages/Products/productsize/Addproductsize";
import EditProductRams from "./pages/Products/productrams/Editproductrams";
import ProductRamsList from "./pages/Products/productrams/Productramslist";
import AddProductRams from "./pages/Products/productrams/Addproductrams";
import { AuthProvider, useAuth } from "./context/Authcontext";
import Orders from "./pages/Orders/Orders";
import HomeBanners from "./pages/HomeBanners/HomeBanners";
import AddHomeSlide from "./pages/HomeBanners/Bannerupload ";
import SlideList from "./pages/HomeBanners/Bannerlist ";
import Profile from "./pages/Profile/Profile";

export const MyContext = createContext();

// ✅ Protected Route
const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  const [isHideSidebarAndNavbar, setIsHideSidebarAndNavbar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isHideSidebarAndNavbar,
    setIsHideSidebarAndNavbar,
    isMobile,
  };

  const sidebarWidth = 260;

  return (
    <BrowserRouter>
      <AuthProvider>
        <MyContext.Provider value={values}>
          <ProductProvider>
            <Toaster position="top-right" />

            {!isHideSidebarAndNavbar && <Navbar />}

            <div className="flex w-full min-h-screen bg-gray-50">
              {!isHideSidebarAndNavbar && (
                <>
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

              <div className="flex-1 flex flex-col min-w-0">
                <main className="p-4 md:p-6">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/products/list" element={<ProductList />} />
                      <Route path="/product/details/:id" element={<ProductDetails />} />
                      <Route path="/product/upload" element={<ProductUpload />} />
                      <Route path="/product/update/:id" element={<ProductUpdate />} />
                      <Route path="/category/add" element={<CategoryForm />} />
                      <Route path="/category/list" element={<CategoryList />} />
                      <Route path="/dashboard/categories/edit/:id" element={<EditCategory />} />
                      <Route path="/subCategory/add" element={<AddSubCategory />} />
                      <Route path="/category/subcategorylist" element={<SubCategoryList />} />
                      <Route path="/category/subCategory/edit/:id" element={<EditSubCategory />} />
                      <Route path="/productrams/add" element={<AddProductRams />} />
                      <Route path="/productrams/list" element={<ProductRamsList />} />
                      <Route path="/productrams/edit/:id" element={<EditProductRams />} />
                      <Route path="/productsize/add" element={<AddProductSize />} />
                      <Route path="/productsize/list" element={<ProductSizeList />} />
                      <Route path="/productsize/edit/:id" element={<EditProductSize />} />
                      <Route path="/productweight/add" element={<AddProductWeight />} />
                      <Route path="/productweight/list" element={<ProductWeightList />} />
                      <Route path="/productweight/edit/:id" element={<EditProductWeight />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/homebanner" element={<HomeBanners />} />
                      <Route path="/profile" element={<Profile />} />
                    </Route>

                    {/* Unknown → login */}
                    <Route path="*" element={<Navigate to="/login" />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProductProvider>
        </MyContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;























// import "react-inner-image-zoom/lib/styles.min.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./layouts/Header/Navbar";
// import Sidebar from "./layouts/Sidebar/Sidebar";
// import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
// import { createContext, useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Login from "./pages/Login/Login";
// import Register from "./pages/Register/Register";
// import ProductDetails from "./pages/Products/ProductDetails/ProductDetails";
// import ProductUpload from "./pages/Products/ProductUpload/ProductUpload";
// import CategoryForm from "./pages/Category/AddCategory/AddCategory";
// import { Toaster } from "react-hot-toast";
// import CategoryList from "./pages/Category/CategoryList/CategoryList";
// import EditCategory from "./pages/Category/Editcategory/Editcategory";
// import ProductList from "./pages/Products/ProductList/ProductList";
// import { ProductProvider } from "./context/ProductContext";
// import ProductUpdate from "./pages/Products/ProductUpdate/ProductUpdate";
// import SubCategoryList from "./pages/Category/SubCategory/SubCategoryList";
// import EditSubCategory from "./pages/Category/SubCategory/EditSubCategory";
// import AddSubCategory from "./pages/Category/SubCategory/AddSubCategory";
// import EditProductWeight from "./pages/Products/productweight/Editproductweight";
// import ProductWeightList from "./pages/Products/productweight/Productweightlist";
// import AddProductWeight from "./pages/Products/productweight/Addproductweight";
// import EditProductSize from "./pages/Products/productsize/Editproductsize";
// import ProductSizeList from "./pages/Products/productsize/Productsizelist";
// import AddProductSize from "./pages/Products/productsize/Addproductsize";
// import EditProductRams from "./pages/Products/productrams/Editproductrams";
// import ProductRamsList from "./pages/Products/productrams/Productramslist";
// import AddProductRams from "./pages/Products/productrams/Addproductrams";
// import { AuthProvider } from "./context/AuthContext";
// import Orders from "./pages/Orders/Orders";
// import HomeBanners from "./pages/HomeBanners/HomeBanners";
// import AddHomeSlide from "./pages/HomeBanners/Bannerupload ";
// import SlideList from "./pages/HomeBanners/Bannerlist ";
// import Profile from "./pages/Profile/Profile";

// export const MyContext = createContext();

// function App() {
//   const [isToggleSidebar, setIsToggleSidebar] = useState(true);
//   const [isHideSidebarAndNavbar, setIsHideSidebarAndNavbar] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 1024);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const values = {
//     isToggleSidebar,
//     setIsToggleSidebar,
//     isHideSidebarAndNavbar,
//     setIsHideSidebarAndNavbar,
//     isMobile,
//   };

//   const sidebarWidth = 260;

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <MyContext.Provider value={values}>
//           <ProductProvider>
//             <Toaster position="top-right" />

//             {!isHideSidebarAndNavbar && <Navbar />}

//             <div className="flex w-full min-h-screen bg-gray-50">
//               {!isHideSidebarAndNavbar && (
//                 <>
//                   {isMobile && isToggleSidebar && (
//                     <div
//                       className="fixed inset-0 bg-black/40 z-[60]"
//                       onClick={() => setIsToggleSidebar(false)}
//                     />
//                   )}
//                   <motion.div
//                     initial={false}
//                     animate={{
//                       width: isToggleSidebar ? sidebarWidth : 0,
//                       x: isMobile ? (isToggleSidebar ? 0 : -sidebarWidth) : 0,
//                     }}
//                     className={`
//                       bg-white border-r border-gray-100 shadow-sm
//                       ${isMobile ? "fixed left-0 top-0 h-full z-[70]" : "sticky top-0 h-screen"}
//                       overflow-hidden
//                     `}
//                   >
//                     <Sidebar />
//                   </motion.div>
//                 </>
//               )}

//               <div className="flex-1 flex flex-col min-w-0">
//                 <main className="p-4 md:p-6">
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/products/list" element={<ProductList />} />
//                     <Route path="/product/details/:id" element={<ProductDetails />} />
//                     <Route path="/product/upload" element={<ProductUpload />} />
//                     <Route path="/product/update/:id" element={<ProductUpdate />} />
//                     <Route path="/category/add" element={<CategoryForm />} />
//                     <Route path="/category/list" element={<CategoryList />} />
//                     <Route path="/dashboard/categories/edit/:id" element={<EditCategory />} />
//                     <Route path="/subCategory/add" element={<AddSubCategory />} />
//                     <Route path="/category/subcategorylist" element={<SubCategoryList />} />
//                     <Route path="/category/subCategory/edit/:id" element={<EditSubCategory />} />
//                     <Route path="/productrams/add" element={<AddProductRams />} />
//                     <Route path="/productrams/list" element={<ProductRamsList />} />
//                     <Route path="/productrams/edit/:id" element={<EditProductRams />} />
//                     <Route path="/productsize/add" element={<AddProductSize />} />
//                     <Route path="/productsize/list" element={<ProductSizeList />} />
//                     <Route path="/productsize/edit/:id" element={<EditProductSize />} />
//                     <Route path="/productweight/add" element={<AddProductWeight />} />
//                     <Route path="/productweight/list" element={<ProductWeightList />} />
//                     <Route path="/productweight/edit/:id" element={<EditProductWeight />} />
//                     <Route path="orders" element={<Orders />} />
//                     <Route path="homebanner" element={<HomeBanners />} />
//                     <Route path="profile" element={<Profile />} />
//                   </Routes>
//                 </main>
//               </div>
//             </div>
//           </ProductProvider>
//         </MyContext.Provider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App;













