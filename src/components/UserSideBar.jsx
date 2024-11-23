import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserSideBar = () => {
  return (
    <>
      <div className="w-[15%] auto  bg-gray-200 flex flex-col justify-between">
        <div className="flex flex-col gap-4 p-4">
          <Link
            to="/user/info"
            className="p-3 text-xl text-center text-gray-500 font-semibold hover:bg-gray-500 rounded-lg transition duration-200 ease-in-out"
          >
            User Profile
          </Link>
          <Link
            to="/user/address"
            className="p-3 text-xl text-center text-gray-500 font-semibold hover:bg-gray-500 rounded-lg transition duration-200 ease-in-out"
          >
            User Address
          </Link>
          <Link
            to="/user/order-status"
            className="p-3 text-xl text-center text-gray-500 font-semibold hover:bg-gray-500 rounded-lg transition duration-200 ease-in-out"
          >
            Order Status
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserSideBar;
