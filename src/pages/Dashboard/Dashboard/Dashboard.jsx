import StatsCards from "../../../components/ProductComponent/StatsCards/StatsCards";
import ProductTable from "../../../components/Shared/ProductTable/ProductTable";
import TableFilters from "../../../components/Shared/TableFilters/TableFilters";
import PageHeader from "../PageHeader/PageHeader";

const Dashboard = () => {
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <PageHeader />
      
      <div className="mt-6">
        <StatsCards />
      </div>

      <div className="mt-8">
        <TableFilters />
        <ProductTable />
      </div>
    </div>
  );
};

export default Dashboard;
