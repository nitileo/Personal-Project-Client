import React from "react";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="hidden md:flex md:w-[15%] h-full bg-gray-800 fixed top-0 left-0 flex-col justify-between py-5">
        <SidebarAdmin />
      </div>
      <div className="ml-0 md:ml-[15%] w-full md:w-[85%] h-auto min-h-screen bg-gray-200 p-5">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
