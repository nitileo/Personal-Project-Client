import React, { useEffect, useState } from "react";
import UserSideBar from "../components/UserSideBar";
import useUserStore from "../stores/userStore";
import useOrderStore from "../stores/orderStore";

const OrderStatus = () => {
  const token = useUserStore((state) => state.token);
  const actionGetOrder = useOrderStore((state) => state.actionGetOrder);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const rs = await actionGetOrder(token);
      const sortedOrders = rs.sort((a, b) => b.id - a.id);
      setOrders(sortedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex mt-[64px]">
      <UserSideBar />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
        {orders.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No orders found.
          </div>
        ) : (
          orders.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{order.id}
                </h2>
                {order.isCancel ? (
                  <span className="text-sm font-medium text-red-600">
                    Order was canceled
                  </span>
                ) : (
                  <span className="text-sm font-medium text-indigo-600">
                    {order.status}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-700 text-sm">
                    {order.address.addressNumber}, {order.address.subdistrict},{" "}
                    {order.address.district}, {order.address.province},{" "}
                    {order.address.zipcode}
                  </p>
                </div>
                <div className="md:text-right">
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-lg font-bold text-indigo-600">
                    ${order.summary}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <h3 className="text-sm font-medium text-gray-800 mb-2">
                  Items
                </h3>
                <ul className="space-y-2">
                  {order.orderItems.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex justify-between items-center"
                    >
                      <div className="text-gray-700 text-sm">
                        {item.product.title} x {item.amount}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
