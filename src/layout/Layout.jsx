import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
