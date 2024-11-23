import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";
import UserSideBar from "./UserSideBar";

const UserInfo = () => {
  const token = useUserStore((state) => state.token);
  const actionGetData = useUserStore((state) => state.actionGetData);
  const actionUpdateData = useUserStore((state) => state.actionUpdateData);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const rs = await actionGetData(token);
    setFormData(rs);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actionUpdateData(token, formData);
    toast.success("update data success");
    getData();
  };

  return (
    <div className="mt-[64px]">
      <div className="bg-slate-200 w-full min-h-screen flex">
        <UserSideBar />

        <div className="w-full md:w-[85%] min-h-screen bg-gray-100 p-6 md:p-10 flex flex-col gap-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            User Information
          </h2>

          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl mx-auto">
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:outline-none"
                />
                <p className="text-xs text-red-500 mt-2">
                  ***Email cannot be changed.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name (ชื่อจริง)
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name (นามสกุล)
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number (เบอร์ติดต่อ)
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
