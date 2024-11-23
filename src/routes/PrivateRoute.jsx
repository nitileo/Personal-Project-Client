import { Navigate } from "react-router-dom";
import useUserStore from "../stores/userStore"; // Assuming you store the token in userStore

const PrivateRoute = ({ children }) => {
  const token = useUserStore((state) => state.token); // Fetch the token from the store

  // If token exists, user is authenticated
  return token ? children : <Navigate to="/unauthorize" />;
};

export default PrivateRoute;
