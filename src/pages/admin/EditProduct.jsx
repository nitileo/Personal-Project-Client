import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import useProductStore from "@/src/stores/productStore";
import useAdminStore from "@/src/stores/adminStore";
import useUserStore from "@/src/stores/userStore";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const categories = useProductStore((state) => state.categories);
  const actionGetCategory = useProductStore((state) => state.actionGetCategory);
  const actionUpdateProduct = useAdminStore(
    (state) => state.actionUpdateProduct
  );

  useEffect(() => {
    actionGetCategory();
  }, []);

  const [formData, setFormData] = useState({
    title: location.state.el.title,
    description: location.state.el.description,
    price: location.state.el.price,
    amount: location.state.el.amount,
    author: location.state.el.author,
    publisher: location.state.el.publisher,
    publishDate: location.state.el.publishDate,
    categoryId: location.state.el.categoryId,
    image: location.state.el.image,
    imageId: location.state.el.imageId,
    previewImage: location.state.el.image,
  });

  console.log(formData);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
      previewImage: null,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        80,
        0,
        (data) => {
          setFormData({
            ...formData,
            image: data,
            imageId: null,
            previewImage: URL.createObjectURL(file),
          });
        },
        "base64"
      );
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (isNaN(formData.price) || isNaN(formData.amount)) {
        return toast.error("Price and amount must be number values.");
      }

      if (Number(formData.price) < 0) {
        return toast.error("Price Data invalid format");
      }
      if (Number(formData.amount) < 0) {
        return toast.error("Amount Data invalid format");
      }
      await actionUpdateProduct(token, location.state.el.id, formData);
      toast.success("update success");
      navigate("/admin/product");
      setFormData({
        title: "",
        description: "",
        price: "",
        amount: "",
        author: "",
        publisher: "",
        publishDate: "",
        categoryId: "",
        image: null,
        previewImage: null,
      });
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto bg-gray-100 p-6 rounded-lg shadow-md w-4/5"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Amount:
          </label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Author:
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Publisher:
          </label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Published Date:
          </label>
          <input
            type="month"
            name="publishDate"
            max="2024-12"
            value={formData.publishDate}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="block w-full bg-white border border-gray-300 rounded py-2 px-3 shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Your Picture:
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {formData.previewImage && (
          <div className="mb-4 relative inline-block">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image Preview:
            </label>
            <div className="relative flex flex-col items-center gap-2">
              <img
                src={formData.previewImage}
                alt="Selected"
                className="rounded-lg shadow-md max-w-xs"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className=" bg-red-500 text-white rounded-lg p-3 text-md hover:bg-red-700 focus:outline-none"
              >
                Remove Image
              </button>
            </div>
          </div>
        )}

        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
