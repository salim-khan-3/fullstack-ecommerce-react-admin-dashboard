
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Home, Loader2 } from "lucide-react";
import { getAllCategories, deleteCategory } from "../../../api/categoryApi";
import Pagination from "../../../components/CategoryComponent/Pagination/Pagination";
import CategoryTableRow from "../../../components/CategoryComponent/CategoryTableRow/CategoryTableRow";

export default function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination States (API থেকে আসবে)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const [selected, setSelected] = useState([]);

  // Fetch Categories (Server-side pagination)
  const fetchCategories = useCallback(async (page) => {
    try {
      setLoading(true);
      const data = await getAllCategories(page); // API-তে পেজ নাম্বার পাঠানো হচ্ছে
      
      // আপনার ব্যাকএন্ড রেসপন্স অনুযায়ী ডেটা সেট করা
      setCategories(data.categoryList || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
      setCurrentPage(data.page || page);
    } catch (err) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  // যখনই currentPage পরিবর্তন হবে, তখনই API কল হবে
  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage, fetchCategories]);

  const handleDelete = async (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2979ff",
      cancelButtonColor: "#ff5252",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(categoryId);
          Swal.fire({ title: "Deleted!", text: "Category has been deleted.", icon: "success", timer: 1500, showConfirmButton: false });
          fetchCategories(currentPage); // ডিলিট হওয়ার পর বর্তমান পেজ রিফ্রেশ
        } catch (err) {
          Swal.fire("Error!", err.message || "Failed to delete.", "error");
        }
      }
    });
  };

  const handleEditClick = (categoryId) => {
    navigate(`/dashboard/categories/edit/${categoryId}`);
  };

  // সিরিয়াল নাম্বার ঠিক করার জন্য লজিক
  const currentData = categories.map((item, idx) => ({
    ...item,
    serialNo: (currentPage - 1) * 3 + idx + 1, // এখানে ৩ হলো আপনার ব্যাকএন্ডের perPage (ঐচ্ছিক)
  }));

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleAll = () => {
    const ids = currentData.map((d) => d._id);
    const allSelected = ids.every((id) => selected.includes(id));
    if (allSelected) setSelected((prev) => prev.filter((x) => !ids.includes(x)));
    else setSelected((prev) => [...new Set([...prev, ...ids])]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Breadcrumb - No changes needed here */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-800">Category List</h1>
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Home size={14} className="text-gray-400" />
          <span>Dashboard / Category</span>
        </nav>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
             {/* ... (আপনার আগের টেবিল কলগ্রুপ এবং হেডার এখানে থাকবে) ... */}
            <thead>
              <tr style={{ backgroundColor: "#2979ff" }}>
                <th className="px-4 py-4 text-center">
                  <input
                    type="checkbox"
                    onChange={toggleAll}
                    checked={currentData.length > 0 && currentData.every((d) => selected.includes(d._id))}
                  />
                </th>
                {["UID", "IMAGE", "CATEGORY", "IMAGE URL", "COLOR", "ACTION"].map((h) => (
                  <th key={h} className="px-3 py-4 text-xs font-bold text-white uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400">No categories found.</td></tr>
              ) : (
                currentData.map((row, idx) => (
                  <CategoryTableRow
                    key={row._id}
                    row={row}
                    idx={idx}
                    isSelected={selected.includes(row._id)}
                    onSelect={toggleSelect}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          currentCount={categories.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}





// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Home, Loader2 } from "lucide-react";
// import { getAllCategories, deleteCategory } from "../../../api/categoryApi";
// import Pagination from "../../../components/CategoryComponent/Pagination/Pagination";
// import CategoryTableRow from "../../../components/CategoryComponent/CategoryTableRow/CategoryTableRow";


// const ITEMS_PER_PAGE = 8;

// export default function CategoryList() {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selected, setSelected] = useState([]);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllCategories();
//       setCategories(Array.isArray(data) ? data : data.categories || []);
//     } catch (err) {
//       setError(err.message || "Failed to load categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchCategories(); }, []);

//   const handleDelete = async (categoryId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#2979ff",
//       cancelButtonColor: "#ff5252",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await deleteCategory(categoryId);
//           Swal.fire({ title: "Deleted!", text: "Category has been deleted.", icon: "success", timer: 1500, showConfirmButton: false });
//           fetchCategories();
//         } catch (err) {
//           Swal.fire("Error!", err.message || "Failed to delete.", "error");
//         }
//       }
//     });
//   };

//   const handleEditClick = (categoryId) => {
//     navigate(`/dashboard/categories/edit/${categoryId}`);
//   };

//   const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
//   const start = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentData = categories.slice(start, start + ITEMS_PER_PAGE).map((item, idx) => ({
//     ...item,
//     serialNo: start + idx + 1,
//   }));

//   const toggleSelect = (id) =>
//     setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

//   const toggleAll = () => {
//     const ids = currentData.map((d) => d._id);
//     const allSelected = ids.every((id) => selected.includes(id));
//     if (allSelected) setSelected((prev) => prev.filter((x) => !ids.includes(x)));
//     else setSelected((prev) => [...new Set([...prev, ...ids])]);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 size={40} className="animate-spin text-blue-500" />
//           <p className="text-sm font-medium text-gray-400">Loading categories...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="bg-white rounded-xl shadow p-8 text-center max-w-sm">
//           <p className="text-red-500 font-semibold text-lg mb-2">Something went wrong!</p>
//           <p className="text-gray-400 text-sm mb-4">{error}</p>
//           <button onClick={() => window.location.reload()} className="px-5 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8" style={{ fontFamily: "'Segoe UI', sans-serif" }}>

//       {/* Breadcrumb */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-4 mb-6 flex items-center justify-between">
//         <h1 className="text-lg font-bold text-gray-800">Category List</h1>
//         <nav className="flex items-center gap-2 text-sm text-gray-500">
//           <Home size={14} className="text-gray-400" />
//           <span className="hover:text-blue-600 cursor-pointer transition-colors">Dashboard</span>
//           <span className="text-gray-300">/</span>
//           <span className="text-gray-700 font-medium">Category</span>
//         </nav>
//       </div>

//       {/* Table Card */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse table-fixed">
//             <colgroup>
//               <col style={{ width: "48px" }} />
//               <col style={{ width: "64px" }} />
//               <col style={{ width: "90px" }} />
//               <col style={{ width: "160px" }} />
//               <col style={{ width: "260px" }} />
//               <col style={{ width: "130px" }} />
//               <col style={{ width: "120px" }} />
//             </colgroup>

//             <thead>
//               <tr style={{ backgroundColor: "#2979ff" }}>
//                 <th className="px-4 py-4 text-center">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 cursor-pointer accent-white"
//                     onChange={toggleAll}
//                     checked={currentData.length > 0 && currentData.every((d) => selected.includes(d._id))}
//                   />
//                 </th>
//                 {["UID", "IMAGE", "CATEGORY", "IMAGE URL", "COLOR", "ACTION"].map((h) => (
//                   <th key={h} className={`px-3 py-4 text-xs font-bold uppercase tracking-widest text-white ${h === "ACTION" ? "text-center" : "text-left"}`}>
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {currentData.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="text-center py-16 text-gray-400 text-sm">
//                     No categories found.
//                   </td>
//                 </tr>
//               ) : (
//                 currentData.map((row, idx) => (
//                   <CategoryTableRow
//                     key={row._id}
//                     row={row}
//                     idx={idx}
//                     isSelected={selected.includes(row._id)}
//                     onSelect={toggleSelect}
//                     onEdit={handleEditClick}
//                     onDelete={handleDelete}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Component */}
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           totalItems={categories.length}
//           currentCount={currentData.length}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// }







