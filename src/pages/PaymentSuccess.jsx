import React from "react";
import Correct from "../assets/checked.png";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/user/order-status");
  };

  return (
    <div className="mt-[64px] h-screen">
      <div className="flex flex-col h-full gap-5 justify-center items-center my-auto mx-auto">
        <img
          src={Correct}
          alt="Payment success"
          className="w-[200px] h-[200px]"
        />
        <p className="text-2xl text-bold">Payment Success</p>
        <button
          className="p-2 w-1/5 bg-blue-500 text-xl font-bold text-white rounded-lg"
          onClick={handleClick}
        >
          Check Your Order Status
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
