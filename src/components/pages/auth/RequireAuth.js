import React, { useEffect, useState } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { accessToken, removeCookie } from "../../hooks/useCookies";
import useValidToken from "../../hooks/useValidToken";
import axiosPrivet from "../../hooks/axiosPrivet";
import Loading from "../../shared/Loading";

const RequireAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [isValidToken, tokenLoading] = useValidToken(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosPrivet.get("users/getLoginUser");
        setUser(data.user);
      } catch (error) {
        console.error("User fetch failed", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = () => {
    removeCookie(accessToken);
  };

  if (loading || tokenLoading) return <Loading />;

  if (!user) {
    handleSignOut();
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  const path = location.pathname;
  const role = user?.role;

  if (role === "admin" && !path.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }

  if (role === "customer" && !path.startsWith("/customer")) {
    return <Navigate to="/customer" replace />;
  }

  if (role === "agent" && !path.startsWith("/agent")) {
    return <Navigate to="/agent" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
