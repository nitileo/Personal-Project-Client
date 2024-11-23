import {
  BookOpenTextIcon,
  ShoppingCart,
  User2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import useCartStore from "../stores/cartStore";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const token = useUserStore((state) => state.token);
  const actionLogout = useUserStore((state) => state.actionLogout);
  const actionGetCart = useCartStore((state) => state.actionGetCart);
  const actionClearCart = useCartStore((state) => state.actionClearCart);
  const cart = useCartStore((state) => state.cart); // ดึงข้อมูลตะกร้า
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      actionGetCart(token); // เรียกข้อมูลตะกร้า
    } else {
      setIsLogin(false);
    }
  }, [token, actionGetCart]);

  const hdlLogout = () => {
    actionLogout();
    actionClearCart();
    navigate("/");
  };

  const hdlCart = () => {
    if (isLogin) {
      navigate("/user/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="h-19 w-[1536px] bg-blue-500 fixed top-0 z-10 flex justify-between shadow-lg px-8 items-center py-2">
        <div className="text-white flex gap-1 text-xl font-semibold items-center">
          <BookOpenTextIcon />
          BOOK2YOU
        </div>
        <div className="flex gap-3 text-white text-xl font-bold">
          <Link to={"/"}>Home</Link>
          <Link to={"/product"}>Product</Link>
        </div>
        <div className="flex gap-6 items-center">
          <div className="relative cursor-pointer" onClick={hdlCart}>
            <ShoppingCart className="text-white" size={32} />
            {cart?.length > 0 && ( 
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {isLogin ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-blue-500 border-none hover:bg-blue-500"
              >
                <User2 size={30} color="white" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <Link to="user/info" className="text-xl">
                    User Info
                  </Link>
                </li>
                <li>
                  <Link to="/user/order-status" className="text-xl">
                    Order Status
                  </Link>
                </li>
                <li>
                  <button className="text-xl" onClick={hdlLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className=" text-white text-xl border-2 p-2 rounded-md hover:bg-blue-400"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
