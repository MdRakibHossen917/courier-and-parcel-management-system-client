import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const serviceCenters = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Express Delivery available in 64 districts
      </h1>

      {/* Later you can add your search box here */}
      {/* <SearchDistrictBox /> */}

      <BangladeshMap serviceCenters={serviceCenters} />
    </div>
  );
};

export default Coverage;
