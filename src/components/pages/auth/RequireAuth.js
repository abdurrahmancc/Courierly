import React, { useEffect, useState } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { accessToken, removeCookie } from "../../hooks/useCookies";
import useValidToken from "../../hooks/useValidToken";
import { useQuery } from "react-query";
import axiosPrivet from "../../hooks/axiosPrivet";
import Loading from "../../sharedPages/Loading";


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

  if (loading || tokenLoading) return <Loading/>;

  if (!user) {
    handleSignOut();
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};


export default RequireAuth;
