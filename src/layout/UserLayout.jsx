import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-slate-50">
    <Header />
    <Outlet />
    <Footer />
  </div>
  )
}

export default UserLayout