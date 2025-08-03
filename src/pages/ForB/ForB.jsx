import React from "react";
import { Link } from "react-router";

const ForB = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <h2 className="text-4xl font-extrabold text-red-600 mb-4">
          403 Forbidden
        </h2>
        <p className="text-gray-700 mb-6">
          Sorry, you don&apos;t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ForB;
