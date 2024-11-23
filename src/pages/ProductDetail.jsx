import React, { useEffect, useState } from "react";
import useCartStore from "../stores/cartStore";
import { toast } from "react-toastify";
import useUserStore from "../stores/userStore";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const actionAddProductCart = useCartStore(
    (state) => state.actionAddProductCart
  );
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const token = useUserStore((state) => state.token);
  const cart = useCartStore((state) => state.cart);
  const location = useLocation();
  const currentProduct = location?.state?.el;
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      if (token) {
        await actionGetCart(token);
        setIsCartLoaded(true);
      }
    };
    loadCart();
  }, [token, actionGetCart]);

  if (!currentProduct) {
    return <div className="mt-16 text-center text-gray-700 text-xl">Product not found!</div>;
  }

  const isInCart = cart.some((item) => item.productId === currentProduct.id);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const formData = { productId: currentProduct.id };

    try {
      await actionAddProductCart(token, formData);
      toast.success("Product added to cart");
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      console.error(errMsg);
      toast.error(errMsg);
    }
  };

  const handleViewCart = () => {
    navigate("/user/cart");
  };

  if (!isCartLoaded) {
    return <div className="mt-16 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="mt-16">
      <div className="w-full h-auto p-8 flex flex-col justify-start items-center bg-white">
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-screen-lg p-10 w-full space-y-8 md:space-y-0">
          <div className="md:w-1/3 w-full flex items-center justify-center">
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              className="w-[85%] h-auto object-cover rounded-lg shadow-lg border border-gray-200"
            />
          </div>

          <div className="md:w-2/3 w-full md:pl-12 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                {currentProduct.title}
              </h1>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Author:</span>{" "}
                  {currentProduct.author}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Publisher:</span>{" "}
                  {currentProduct.publisher}
                </p>
              </div>
              <div className="text-3xl font-bold text-blue-500 mt-8">
                {currentProduct.price} ฿
              </div>
            </div>

            <div className="mt-10">
              {isInCart ? (
                <button
                  className="w-full bg-gray-400 text-white font-semibold rounded-lg px-6 py-3 cursor-pointer shadow-md hover:bg-gray-500 transition-all"
                  onClick={handleViewCart}
                >
                  View Product in Your Cart
                </button>
              ) : (
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:from-blue-600 hover:to-blue-800 transition-all"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white max-w-screen-lg w-full mt-10 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Description</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {currentProduct.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
