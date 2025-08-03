import React from "react";
import BangladeshMap from "./BangladeshMap";

// Mock Data - Replace with your `useLoaderData()` if using routing
const mockServiceCenters = [
  {
    district: "Dhaka",
    latitude: 23.8103,
    longitude: 90.4125,
    covered_area: ["Dhanmondi", "Gulshan", "Mirpur"],
  },
  {
    district: "Chattogram",
    latitude: 22.3569,
    longitude: 91.7832,
    covered_area: ["Pahartali", "Agrabad"],
  },
  {
    district: "Rajshahi",
    latitude: 24.3745,
    longitude: 88.6042,
    covered_area: ["Boalia", "Shaheb Bazar"],
  },
  // ➕ Add more districts here
];

const Coverage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Express Delivery available in 64 districts
      </h1>

      <BangladeshMap serviceCenters={mockServiceCenters} />
    </div>
  );
};

export default Coverage;
