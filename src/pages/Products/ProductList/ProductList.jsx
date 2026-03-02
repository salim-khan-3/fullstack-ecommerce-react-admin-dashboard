
import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/ProductComponent/PageHeader/PageHeader";
import StatsCards from "../../../components/ProductComponent/StatsCards/StatsCards";
import TableFilters from "../../../components/Shared/TableFilters/TableFilters";
import ProductTable from "../../../components/Shared/ProductTable/ProductTable";
import { getAllProducts, getProductsByCategory } from "../../../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (categoryId = "") => {
    setLoading(true);
    try {
      const data = categoryId
        ? await getProductsByCategory(categoryId)
        : await getAllProducts();

      setProducts(Array.isArray(data.data) ? data.data : data.products || data);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (categoryId) => {
    fetchProducts(categoryId); // শুধুমাত্র এই page-এ filter হবে
  };

  return (
    <div>
      <PageHeader />
      <StatsCards />
      <div className="mt-6">
        <TableFilters onCategoryChange={handleCategoryChange} />
        <ProductTable products={products} loading={loading} />
      </div>
    </div>
  );
};

export default ProductList;