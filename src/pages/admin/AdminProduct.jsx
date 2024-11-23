import useAdminStore from "@/src/stores/adminStore";
import useUserStore from "@/src/stores/userStore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProduct = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  // const refresh = useAdminStore((state) => state.refresh);
  const products = useAdminStore((state) => state.products);
  const actionGetProduct = useAdminStore((state) => state.actionGetProduct);
  const actionDeleteProduct = useAdminStore(
    (state) => state.actionDeleteProduct
  );
  const actionReactiveProduct = useAdminStore(
    (state) => state.actionReactiveProduct
  );

  useEffect(() => {
    actionGetProduct(token);
  }, []);

  const hdlClick = () => {
    navigate("/admin/addproduct");
  };

  const hdlEdit = (el) => {
    navigate("/admin/editproduct", { state: { el } });
    x;
  };

  const hdlDelete = async (id) => {
    try {
      await actionDeleteProduct(token, id);
      toast.success("Product Inactive Success");
      await actionGetProduct(token);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };

  const hdlReactive = async (id) => {
    try {
      await actionReactiveProduct(token, id);
      toast.success("Product reactivated successfully");
      await actionGetProduct(token);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          onClick={hdlClick}
        >
          Add New Product
        </button>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">No.</th>
              <th className="px-6 py-3 text-left">Picture</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Sold</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  No products available
                </td>
              </tr>
            ) : (
              products.map((el, index) => (
                <tr
                  key={el.id}
                  className={`border-t hover:bg-gray-50 ${
                    el.isDelete ? "bg-gray-200 text-gray-400" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={
                        el.image ? el.image : "https://via.placeholder.com/150"
                      }
                      alt={el.name}
                      className="h-12 w-12 rounded-lg object-cover hover:scale-105 transition transform duration-200"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">{el.title}</td>
                  <td className="px-6 py-4 text-sm">{el.category.name}</td>
                  <td className="px-6 py-4 text-sm">{el.author}</td>
                  <td className="px-6 py-4 text-sm">
                    {el.description.length > 50
                      ? `${el.description.slice(0, 50)}...`
                      : el.description}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    ฿{el.price}
                  </td>
                  <td className="px-6 py-4 text-sm">{el.sellAmount}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      {el.isDelete ? (
                        <>
                          <span className="text-red-500">Inactive</span>
                          <button
                            className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
                            onClick={() => hdlReactive(el.id)}
                          >
                            Reactivate
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition"
                            onClick={() => hdlEdit(el)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                            onClick={() => hdlDelete(el.id, el.imageId)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProduct;
