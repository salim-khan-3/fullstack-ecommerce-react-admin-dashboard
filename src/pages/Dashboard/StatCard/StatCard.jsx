import React from "react";
import { MoreVertical } from "lucide-react";

const StatCard = ({
  title,
  value,
  subtitle,
  gradient,
  icon
}) => {
  return (
    <div
      className={`relative rounded-xl p-6 text-white shadow-md ${gradient}`}
    >
      {/* Top Right Icon */}
      <div className="absolute top-4 right-4 opacity-80">
        {icon}
      </div>

      <h4 className="text-sm opacity-90">{title}</h4>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
      <p className="text-sm mt-4 opacity-90">{subtitle}</p>

      <MoreVertical
        size={18}
        className="absolute bottom-4 right-4 opacity-80 cursor-pointer"
      />
    </div>
  );
};

export default StatCard;
