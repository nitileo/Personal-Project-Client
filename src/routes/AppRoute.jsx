import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeUser from "../components/HomeUser";
import Layout from "../layout/Layout";
import Login from "../pages/Login";
import Product from "../pages/Product";
import AdminLayout from "../layout/AdminLayout";
import ManageUser from "../pages/admin/ManageUser";
import AdminProduct from "../pages/admin/AdminProduct";
import Order from "../pages/admin/Order";
import Unauthorized from "../pages/Unauthorized";
import PageNotFound from "../pages/PageNotFound";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import UserInfo from "../components/UserInfo";
import UserAddress from "../components/UserAddress";
import Cart from "../pages/Cart";
import Checkout from "../pages/checkout";
import PaymentSuccess from "../pages/PaymentSuccess";
import OrderStatus from "../pages/OrderStatus";
import ProductDetail from "../pages/ProductDetail";
import ProtectRoute from "./ProtectRoute";
import UserLayout from "../layout/UserLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "login", element: <Login /> },
      { path: "product", element: <Product /> },
      { path: "product/detail", element: <ProductDetail /> },
      { path: "unauthorize", element: <Unauthorized /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRoute element={<UserLayout />} allow={["USER","ADMIN"]} />,
    children:[
      {path: "info" , element: <UserInfo/>},
      {path: "address" , element: <UserAddress/>},
      {path: "order-status" , element: <OrderStatus />},
      {path: "cart", element: <Cart />},
      {path: "checkout" , element: <Checkout />},
      {path: "success",element: <PaymentSuccess /> }
    ],
  },
  {
    path: "/admin",
    element: <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />,
    children: [
      { index: true, element: <ManageUser /> },
      { path: "product", element: <AdminProduct /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "editproduct", element: <EditProduct /> },
      { path: "order", element: <Order /> },
    ],
  },
]);

const AppRoute = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoute;
