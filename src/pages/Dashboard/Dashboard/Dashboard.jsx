
import StatsCards from "../../../components/ProductComponent/StatsCards/StatsCards";
import ProductTable from "../../../components/Shared/ProductTable/ProductTable";
import TableFilters from "../../../components/Shared/TableFilters/TableFilters";
import { useProducts } from "../../../context/hooks/useProducts";
import PageHeader from "../PageHeader/PageHeader";

const Dashboard = () => {
  const { products, loading, fetchProducts } = useProducts();

  const handleCategoryChange = (categoryId) => {
    fetchProducts(categoryId); // context থেকে fetch হবে
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader />

      <div className="mt-6">
        <StatsCards />
      </div>

      <div className="mt-8">
        <TableFilters onCategoryChange={handleCategoryChange} />
        <ProductTable products={products} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;