import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import axios from "axios";

const ProtectRoute = ({ element, allow }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    checkRole();
  }, []);

  const currentUser = (token) =>
    axios.post(
      "http://localhost:8080/auth/current-user",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  const checkRole = async () => {
    try {
      const resp = await currentUser(token);
      console.log(resp);
      const role = resp.data.member.role;
      if (allow.includes(role)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    } catch (error) {
      console.log(error);
      setIsAllowed(false);
    }
  };

  if (isAllowed === null) {
    return <div>Loading...</div>;
  }
  if (!isAllowed) {
    return <Navigate to={"/unauthorize"} />;
  }

  return element;
};

export default ProtectRoute;
