import React, { useState } from "react";
import Register from "./register";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateLogin } from "../utils/validate";

const login = () => {
  const actionLogin = useUserStore((state) => state.actionLogin);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const hdlChange = (e) => {
    setForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const roleRedirect = (role) => {
    console.log(role);
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const hdlClick = async (e) => {
    try {
      const inputError = validateLogin(form);
      if (inputError) {
        return setFormError(inputError);
      }
      const role = await actionLogin(form);
      console.log("Login success");

      if (role) {
        roleRedirect(role.user.user.role);
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="flex flex-col gap-6 px-8 w-full max-w-md bg-white p-10 rounded-xl shadow-2xl ">
          <h1 className="text-center text-4xl font-extrabold text-gray-800">
            Login
          </h1>
          <label className="flex flex-col gap-2 font-semibold text-gray-700">
            E-mail
            <input
              type="email"
              className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none shadow-md transition duration-300 ease-in-out hover:border-blue-400"
              placeholder="example@email.com"
              name="email"
              value={form.email}
              onChange={hdlChange}
            />
          </label>
          {formError.email && (
            <p className="text-red-500 text-sm -mt-4">{formError.email}</p>
          )}
          <label className="flex flex-col gap-2 font-semibold text-gray-700">
            Password
            <input
              type="password"
              className="rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none shadow-md transition duration-300 ease-in-out hover:border-blue-400"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={hdlChange}
            />
          </label>
          {formError.password && (
            <p className="text-red-500 text-sm -mt-4">{formError.password}</p>
          )}
          <button
            className="bg-blue-500 font-bold text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={hdlClick}
          >
            Login
          </button>
          <button
            className="bg-green-500 font-bold text-white py-3 rounded-lg shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={() =>
              document.getElementById("register-modal").showModal()
            }
          >
            Register
          </button>
        </div>
      </div>
      <dialog
        id="register-modal"
        className="modal bg-white p-5 rounded-lg shadow-lg"
      >
        <div className="modal-box relative p-6">
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={(e) => e.target.closest("dialog").close()}
          >
            ✕
          </button>
          <Register />
        </div>
      </dialog>
    </>
  );
};

export default login;
