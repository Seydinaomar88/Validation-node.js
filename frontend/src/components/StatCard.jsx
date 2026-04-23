import React from "react";

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="group bg-white p-7 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex items-center gap-5 cursor-default">
    <div
      className={`p-4 rounded-xl transition-transform duration-300 ease-in-out group-hover:scale-110 ${colorClass}`}
    >
      {Icon}
    </div>

    <div>
      <h3 className="text-gray-500 text-md font-medium mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

export default StatCard;
