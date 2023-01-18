import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Home />;
};

export default ProtectedRoute;
