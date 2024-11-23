import React, { useEffect, useState } from "react";
import UserSideBar from "./UserSideBar";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";

const UserAddress = () => {
  const actionGetAddress = useUserStore((state) => state.actionGetAddress);
  const actionUpdateAddress = useUserStore(
    (state) => state.actionUpdateAddress
  );
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = useState({
    addressNumber: "",
    subdistrict: "",
    district: "",
    province: "",
    zipcode: "",
  });

  const getData = async () => {
    const rs = await actionGetAddress(token);
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
    await actionUpdateAddress(token, formData);
    toast.success("update data success");
    getData();
  };

  return (
    <div className="mt-[64px] flex">
      <UserSideBar />
      <div className="w-full md:w-[85%] h-screen bg-gray-100 p-6 md:p-10 flex flex-col gap-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Address Information
        </h2>
        <form
          className="space-y-6 bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl mx-auto"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Number (บ้านเลขที่ ซอย หมู่บ้าน )
            </label>
            <input
              type="text"
              name="addressNumber"
              value={formData.addressNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subdistrict (ตำบล)
            </label>
            <input
              type="text"
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District (อำเภอ)
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Province (จังหวัด)
            </label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zipcode (รหัสไปรษณีย์)
            </label>
            <input
              type="text"
              name="zipcode"
              value={formData.zipcode}
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
  );
};

export default UserAddress;
