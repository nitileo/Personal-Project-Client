import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-9xl font-bold text-gray-800">403</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mt-4">
        Unauthorized Access
      </h2>
      <p className="text-lg text-gray-500 mt-2">
        Sorry, you don’t have permission to access this page. Please contact the
        administrator if you believe this is a mistake.
      </p>
      <Link to="/" className="mt-6">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default Unauthorized;
