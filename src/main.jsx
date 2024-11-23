import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer autoClose={1500} hideProgressBar={false} closeOnClick pauseOnHover={false}/>
    <App />
  </>
);
