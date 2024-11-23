import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBasketIcon } from "lucide-react";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();

  const token = useUserStore((state) => state.token);
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const actionDeleteCart = useCartStore((state) => state.actionDeleteCart);
  const actionEditCart = useCartStore((state) => state.actionEditCart);
  const actionSetTotalPrice = useCartStore(
    (state) => state.actionSetTotalPrice
  );
  const totalPrice = useCartStore((state) => state.totalPrice);
  const actionGetAddress = useUserStore((state) => state.actionGetAddress);

  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [debounceItem, setDebounceItem] = useState(null);

  const [formData, setFormData] = useState({
    cartData: cart,
    totalPrice,
  });

  useEffect(() => {
    getAllCart();
    actionGetAddress(token);
  }, []);

  useEffect(() => {
    if (debounceItem) {
      const { id, amount } = debounceItem;
      const debounceTimeout = setTimeout(() => {
        actionEditCart(token, id, { amount });
      }, 1000);
      return () => clearTimeout(debounceTimeout);
    }
  }, [debounceItem]);

  const getAllCart = async () => {
    try {
      const rs = await actionGetCart(token);
      setCart(rs);
      calculateTotalPrice(rs);
    } catch (err) {
      console.log(err);
    }
  };
  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((acc, curr) => {
      return acc + curr.product.price * curr.amount;
    }, 0);
    setTotalCartPrice(total);
  };

  const handleDelete = async (id) => {
    await actionDeleteCart(token, id);
    getAllCart();
  };
  const handleAmountChange = (id, newAmount) => {
    const updatedCart = cart.map((el) => {
      if (el.id === id) {
        return { ...el, amount: newAmount };
      }
      return el;
    });

    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
    setDebounceItem({ id, amount: newAmount });
  };

  const handleCheckout = () => {
    navigate("/user/checkout");
    actionSetTotalPrice(totalCartPrice);
  };

  return (
    <>
      {cart.length === 0 ? (
        <div className="h-[100vh] flex flex-col items-center justify-center bg-slate-50">
          <ShoppingBasketIcon size={120} />
          <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
          <p className="text-lg text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/product">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-[64px] h-auto p-10 w-4/5 mx-auto flex flex-col gap-2 bg-slate-50">
          <p className="text-3xl font-bold mb-4">Your Cart</p>
          <div className="bg-white w-full mx-auto h-[48px] flex justify-around items-center p-1 font-semibold pr-6 shadow-sm">
            <div className="w-[72px] text-center">สินค้า</div>
            <div className="flex-1 text-center"></div>
            <div className="w-[120px] text-center">ราคาต่อชิ้น</div>
            <div className="w-[120px] text-center">จำนวนชิ้น</div>
            <div className="w-[120px] text-center">ราคารวม</div>
            <div className="w-[120px] text-center">แอคชั่น</div>
          </div>
          <hr className="border-gray-300 my-2" />

          {cart.map((el) => (
            <div
              key={el.id}
              className="bg-white w-full h-[120px] mx-auto flex p-4 items-center justify-around rounded-lg shadow"
            >
              <div className="bg-sky-500 h-full w-[72px] flex items-center justify-center rounded">
                <img
                  src={el.product.image}
                  alt={el.product.title}
                  className="w-full h-full object-cover rounded-md"
                  style={{ maxWidth: "72px", maxHeight: "100px" }}
                />
              </div>
              <div className="flex-1 pl-6 font-semibold">
                {el.product.title}
              </div>
              <div className="w-[120px] text-center">{el.product.price} ฿</div>
              <div className="flex items-center justify-center bg-white rounded-lg space-x-3 w-[120px]">
                <button
                  className="bg-blue-500 text-white px-2 rounded"
                  onClick={() => {
                    if (el.amount === 1) return;
                    handleAmountChange(el.id, el.amount - 1);
                  }}
                >
                  -
                </button>
                <p className="w-6 text-center">{el.amount}</p>
                <button
                  className="bg-blue-500 text-white px-2 rounded"
                  onClick={() => handleAmountChange(el.id, el.amount + 1)}
                >
                  +
                </button>
              </div>
              <div className="w-[120px] text-center">
                {(el.product.price * el.amount).toFixed(2)} ฿
              </div>
              <div className="w-[120px] text-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(el.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <hr className="border-gray-300 my-2" />
          <div className="flex justify-end text-xl font-bold">
            Total: {totalCartPrice.toFixed(2)} ฿
          </div>
          <button
            className="bg-blue-500 p-2 text-white text-xl w-2/5 rounded-lg mx-auto"
            onClick={() => document.getElementById("confirm-modal").showModal()}
          >
            checkout
          </button>
          <dialog id="confirm-modal" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <p className="py-4 text-center text-lg">Your Total Price</p>
              <p className="text-center text-3xl font-bold">
                {totalCartPrice.toFixed(2)} BATH
              </p>
              <div className="flex gap-2 items-center justify-center p-3 mt-4">
                <button
                  className="p-2 bg-slate-400 text-bold text-white rounded-lg"
                  onClick={(e) => e.target.closest("dialog").close()}
                >
                  Back
                </button>
                <button
                  className="p-2 bg-blue-500 text-bold text-white rounded-lg"
                  onClick={handleCheckout}
                >
                  Confirm
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default Cart;
