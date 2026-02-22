import ProductTable from "../ProductTable/ProductTable";
import StatCard from "../StatCard/StatCard";
import { Users, ShoppingCart, ShoppingBag, Star, TrendingUp, TrendingDown } from "lucide-react";


const Dashboard = () => {

 

  return (
    <div className="p-6 bg-gray-50 ">
      <div className="">
        <StatCard></StatCard>
      </div>

      <div>
        <ProductTable></ProductTable>
      </div>
    </div>
  );
};

export default Dashboard;