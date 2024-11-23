import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import { validateRegister } from "../utils/validate";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const Register = () => {
  const actionRegister = useUserStore((state) => state.actionRegister);
  const [formError, setFormError] = useState({});
  const [form, setForm] = useState(initialState);

  const hdlChange = (e) => {
    setForm((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const inputError = validateRegister(form);
      if (inputError) {
        return setFormError(inputError);
      }
      await actionRegister(form);
      setForm(initialState);
      setFormError({});
      toast.success("Register Success");
      e.target.closest("dialog").close();
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <form
      className="bg-white  rounded-lg p-6 w-full max-w-md mx-auto space-y-6"
      onSubmit={hdlSubmit}
    >
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
        Create an Account
      </h1>
      <div className="flex gap-4">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            name="firstName"
            value={form.firstName}
            onChange={hdlChange}
          />
          {formError.firstName && (
            <p className="text-red-500 text-sm mt-1">{formError.firstName}</p>
          )}
        </div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            name="lastName"
            value={form.lastName}
            onChange={hdlChange}
          />
          {formError.lastName && (
            <p className="text-red-500 text-sm mt-1">{formError.lastName}</p>
          )}
        </div>
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          name="email"
          value={form.email}
          onChange={hdlChange}
        />
        {formError.email && (
          <p className="text-red-500 text-sm mt-1">{formError.email}</p>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          className="input input-bordered w-full rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          name="phone"
          value={form.phone}
          onChange={hdlChange}
        />
        {formError.phone && (
          <p className="text-red-500 text-sm mt-1">{formError.phone}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered w-full rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          name="password"
          value={form.password}
          onChange={hdlChange}
        />
        {formError.password && (
          <p className="text-red-500 text-sm mt-1">{formError.password}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          className="input input-bordered w-full rounded-lg p-3 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={hdlChange}
        />
        {formError.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {formError.confirmPassword}
          </p>
        )}
      </div>
      <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
        Sign Up
      </button>
    </form>
  );
};

export default Register;
