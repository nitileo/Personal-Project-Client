import React, { useEffect, useState } from "react";
import useUserStore from "@/src/stores/userStore";
import { toast } from "react-toastify";
import useAdminStore from "@/src/stores/adminStore";

const Order = () => {
  const token = useUserStore((state) => state.token);
  const orders = useAdminStore((state) => state.orders);
  const actionGetAllOrder = useAdminStore((state) => state.actionGetAllOrder);
  const actionUpdateOrder = useAdminStore((state) => state.actionUpdateOrder);
  const actionCancelOrder = useAdminStore((state) => state.actionCancelOrder);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await actionGetAllOrder(token);
    } catch (err) {
      console.error("Error fetching orders", err);
      toast.error("Failed to fetch orders");
    }
  };

  const handleUpdateOrder = async (orderId, status) => {
    try {
      console.log(orderId, status);
      await actionUpdateOrder(token, status, orderId);
      toast.success("Order updated successfully");
      getData();
    } catch (err) {
      console.error("Error updating order", err);
      toast.error("Failed to update order");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await actionCancelOrder(token, orderId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Items</th>
              <th className="py-3 px-4 text-right">Summary</th>
              <th className="py-3 px-4 text-center">Slip Image</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No orders available
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const status = order.status;

                return (
                  <tr key={order.id} className="border-t">
                    <td className="py-3 px-4">
                      <p>
                        {order.user.firstName} {order.user.lastName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.user.email}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <p>
                        {order.address.addressNumber},{" "}
                        {order.address.subdistrict}
                      </p>
                      <p>
                        {order.address.district}, {order.address.province}
                      </p>
                      <p>{order.address.zipcode}</p>
                    </td>
                    <td className="py-3 px-4">
                      <ul className="list-disc list-inside">
                        {order.orderItems.map((item, index) => (
                          <li key={index}>
                            {item.product.title} x {item.amount}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 text-right">${order.summary}</td>
                    <td className="py-3 px-4 text-center">
                      {order.payments && order.payments.slipImage ? (
                        <a
                          href={order.payments.slipImage}
                          target="_blank"
                          // rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          View Slip
                        </a>
                      ) : (
                        <span className="text-gray-500">No Slip</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.isCancel ? (
                        <span className="text-red-500 font-bold">Canceled</span>
                      ) : (
                        <select
                          className="border border-gray-300 rounded px-2 py-1"
                          value={status}
                          onChange={(e) =>
                            handleUpdateOrder(order.id, e.target.value)
                          }
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PACKING">PACKING</option>
                          <option value="SHIPPING">SHIPPING</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {order.isCancel ? (
                        <span className="text-gray-500">
                          No actions available
                        </span>
                      ) : (
                        <button
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          Cancel Order
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
