import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const flaguser = JSON.parse(localStorage.getItem("userLogin"));

  return flaguser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
