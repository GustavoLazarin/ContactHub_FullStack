import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const user = localStorage.getItem("contact_hub:@user");

    return user ? < Outlet/> : <Navigate to="/"/>
};