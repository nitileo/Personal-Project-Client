import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";
import qrCode from "../assets/QR Code.jpg";
import { Upload } from "lucide-react";
import useCartStore from "../stores/cartStore";
import Resizer from "react-image-file-resizer";
import useOrderStore from "../stores/orderStore";
import { useNavigate } from "react-router-dom";

const checkout = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const cart = useCartStore((state) => state.cart);
  const token = useUserStore((state) => state.token);
  const address = useUserStore((state) => state.address);
  const actionUpdateAddress = useUserStore(
    (state) => state.actionUpdateAddress
  );
  const actionCreateOrder = useOrderStore((state) => state.actionCreateOrder);

  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setEdit((prv) => !prv);
  };

  const [formData, setFormData] = useState({
    addressNumber: address.addressNumber,
    subdistrict: address.subdistrict,
    district: address.district,
    province: address.province,
    zipcode: address.zipcode,
  });

  const [picture, setPicture] = useState({
    image: null,
    previewImage: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actionUpdateAddress(token, formData);
    setEdit(setEdit((prv) => !prv));
    toast.success("update data success");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        80,
        0, // rotation
        (data) => {
          setPicture({
            ...picture,
            image: data,
            previewImage: URL.createObjectURL(file),
          });
        },
        "base64"
      );
    }
  };

  const submitData = {
    cart: cart,
    addressId: address.id,
    totalPrice: totalPrice,
    image: picture.image,
  };

  const handlePayment = (e) => {
    e.preventDefault();
    actionCreateOrder(token, submitData);
    navigate("/user/success");
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    document.getElementById("confirm-modal").showModal();
  };

  return (
    <div className="mt-[64px] bg-slate-50 p-10">
      <div className="text-2xl text-center text-bold mb-4">
        Please Confirm Your Address
      </div>
      <div className="w-2/5 mx-auto">
        <form
          className="space-y-4 min-w-[450px] bg-white p-6 mx-auto rounded-md shadow-xl"
          onSubmit={(e) => handleSubmit(e)}
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
              className={`mt-1 block w-full p-2 border px-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                edit
                  ? ""
                  : "disable border-none pointer-events-none text-gray-500"
              }`}
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
              className={`mt-1 block w-full p-2 border px-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                edit
                  ? ""
                  : "disable border-none pointer-events-none text-gray-500"
              }`}
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
              className={`mt-1 block w-full p-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                edit
                  ? ""
                  : "disable border-none pointer-events-none text-gray-500"
              }`}
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
              className={`mt-1 block w-full p-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                edit
                  ? ""
                  : "disable border-none pointer-events-none text-gray-500"
              }`}
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
              className={`mt-1 block w-full p-2 border px-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                edit
                  ? ""
                  : "disable border-none pointer-events-none text-gray-500"
              }`}
            />
          </div>

          <div className="flex justify-center gap-6">
            {edit ? (
              <button
                type="submit"
                className="w-1/5 bg-green-400  text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Update
              </button>
            ) : (
              <button
                className="w-1/5 bg-slate-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={(e) => handleClick(e)}
              >
                Edit
              </button>
            )}

            {edit ? (
              ""
            ) : (
              <button
                className="w-1/5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={(e) => handleConfirm(e)}
              >
                Confirm
              </button>
            )}
          </div>
        </form>
      </div>

      <dialog id="confirm-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <p className="py-4 text-center text-lg">Please Scan your Payment</p>
          <div className="flex justify-center">
            <img src={qrCode} alt="" width="200px" />
          </div>
          <p className="text-center text-3xl font-bold">{totalPrice} BATH</p>
          <div className="flex justify-center flex-col">
            <input
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={handleFileChange}
            />
            <button
              onClick={() => document.getElementById("upload-image").click()}
              className="flex justify-center"
            >
              <Upload size={32} />
            </button>
          </div>
          {picture.previewImage && (
            <div className="flex mt-8 w-[200px] h-[225px] justify-center mx-auto flex-col gap-2">
              <img src={picture.previewImage} alt="SLIP" className="mx-auto" />
              <button
                className="bg-emerald-500 p-2 rounded-lg text-white font-bold"
                onClick={handlePayment}
              >
                Confirm Payment
              </button>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default checkout;
