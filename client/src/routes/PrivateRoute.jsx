import { Navigate, Outlet } from "react-router-dom";

// A custom route to protect the admin page
const PrivateRoute = () => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/admin" />;
    }

    // If authenticated, render the component (admin-dashboard)
    return <Outlet />;
};

export default PrivateRoute;
