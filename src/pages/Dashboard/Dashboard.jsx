
import StatCard from "../Dashboard/StatCard/StatCard";

import { User, ShoppingCart, Briefcase, Star } from "lucide-react";
import SalesCard from "./SalesCard/SalesCard";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        <StatCard
          title="Total Users"
          value="277"
          subtitle="Last Month"
          gradient="bg-gradient-to-r from-green-500 to-green-400"
          icon={<User size={24} />}
        />

        <StatCard
          title="Total Orders"
          value="277"
          subtitle="Last Month"
          gradient="bg-gradient-to-r from-purple-600 to-pink-500"
          icon={<ShoppingCart size={24} />}
        />

        <StatCard
          title="Total Projects"
          value="277"
          subtitle="Last Month"
          gradient="bg-gradient-to-r from-blue-600 to-blue-400"
          icon={<Briefcase size={24} />}
        />

        <StatCard
          title="Total Reviews"
          value="277"
          subtitle="Last Month"
          gradient="bg-gradient-to-r from-yellow-500 to-yellow-400"
          icon={<Star size={24} />}
        />

        <div className="md:col-span-2 xl:col-span-1">
          <SalesCard />
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
