import useUserStore from "@/src/stores/userStore";
import {
  BookA,
  BookCheck,
  BookHeartIcon,
  ChartColumnStacked,
  ListOrderedIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SidebarAdmin = () => {
  const actionLogout = useUserStore((state) => state.actionLogout);
  const navigate = useNavigate();
  const hdlLogout = () => {
    actionLogout();
    navigate("/");
  };

  return (
    <div className="flex flex-col h-4/5 justify-between py-5 bg-gray-800">
      <div className="flex flex-col items-start text-lg text-white gap-6 px-7">
        <Link
          to={"/admin"}
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md w-full transition duration-300 ease-in-out"
        >
          <SettingsIcon />
          <span>Manage User</span>
        </Link>

        <Link
          to={"/admin/product"}
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md w-full transition duration-300 ease-in-out"
        >
          <BookHeartIcon />
          <span>Product</span>
        </Link>

        <Link
          to={"/admin/order"}
          className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded-md w-full transition duration-300 ease-in-out"
        >
          <ListOrderedIcon />
          <span>Order</span>
        </Link>
      </div>
      <Link
        onClick={hdlLogout}
        className="flex items-center gap-3 text-lg text-white px-7 hover:bg-red-600 p-2 rounded-md transition duration-300 ease-in-out"
      >
        <LogOutIcon />
        <span>Logout</span>
      </Link>
    </div>
  );
};

export default SidebarAdmin;
