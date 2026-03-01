import { useState, useEffect } from "react";
import StatsCards from "../../../components/ProductComponent/StatsCards/StatsCards";
import ProductTable from "../../../components/Shared/ProductTable/ProductTable";
import TableFilters from "../../../components/Shared/TableFilters/TableFilters";
import PageHeader from "../PageHeader/PageHeader";
import { getAllProducts } from "../../../api/productApi"; // আপনার API ফাইলের পাথ দিন

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data); 
      } catch (error) {
        console.error("ডেটা লোড করতে সমস্যা হয়েছে:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader />
      
      <div className="mt-6">
        <StatsCards />
      </div>

      <div className="mt-8">
        <TableFilters />
        <ProductTable products={products} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;
