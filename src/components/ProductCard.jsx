import React, { useEffect, useState } from "react";
import useCartStore from "../stores/cartStore";
import useUserStore from "../stores/userStore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ el }) => {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const cart = useCartStore((state) => state.cart);
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const actionAddProductCart = useCartStore(
    (state) => state.actionAddProductCart
  );
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

  const isInCart = cart.some((item) => item.productId === el.id);

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const formData = { productId: el.id };

    try {
      await actionAddProductCart(token, formData);
      toast.success("Product added to cart");
    } catch (error) {
      const errMsg = error?.response?.data?.message || error.message;
      console.error(errMsg);
      toast.error(errMsg);
    }
  };

  const handleViewCart = () => {
    navigate("/user/cart");
  };

  const handleViewDetail = () => {
    navigate("/product/detail", { state: { el } }); 
  };


  if (!isCartLoaded) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="w-[250px] h-[500px] bg-white p-5 flex flex-col items-center justify-between shadow-lg rounded-lg mb-3">

      <div
        className="w-full h-[300px] cursor-pointer"
        onClick={handleViewDetail}
      >
        <img
          src={el.image}
          alt={el.title || "Product Image"}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div
        className="text-center font-semibold text-base mt-4 text-gray-800 cursor-pointer"
        onClick={handleViewDetail}
      >
        {el.title?.length > 30 ? `${el.title.slice(0, 30)}...` : el.title || "Untitled"}
      </div>

      <div className="text-lg font-bold text-blue-600 my-2">
        {el.price ? `${el.price} $` : "Price not available"}
      </div>

      {isInCart ? (
        <button
          className="w-full bg-gray-400 text-white px-2 py-1 rounded-md cursor-pointer"
          onClick={handleViewCart}
        >
          View Cart
        </button>
      ) : (
        <button
          className="w-full bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
