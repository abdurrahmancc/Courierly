import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { adminRoutes } from "../admin/AdminRoutes";
import Navbar from "./Navbar";
import { useQuery } from "react-query";
import axiosPrivet from "../../hooks/axiosPrivet";
import { customerRoutes } from "../customer/CustomerRoutes";
import { deliveryAgentRouters } from "../deliveryAgent/deliveryAgentRoutes";
import Loading from "../../shared/Loading"

const SideNavber = () => {
const [routes, setRoutes] = useState([]);

  const { data, isLoading, isError, error } = useQuery(
    "getUser",
    async () => await axiosPrivet.get("users/getLoginUser")
  );

  useEffect(() => {
    if (data?.data?.user?.role === "admin") {
      setRoutes(adminRoutes);
    } else if (data?.data?.user?.role === "customer") {
      setRoutes(customerRoutes);
    } else if(data?.data?.user?.role === "deliveryAgent") {
      setRoutes(deliveryAgentRouters);
    }
  }, [data]);

  if(isLoading) return <Loading/>

  return (
    <>
      <div className="drawer lg:drawer-open bg-base-100">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center">
          <Navbar />
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-200 text-base-content min-h-screen w-80 p-6 rounded-r-lg shadow-lg flex flex-col">
            <h4 className="text-2xl text-center font-bold mb-6 text-primary">
              Courierly
            </h4>
            <ul className="menu w-full flex-1 space-y-3">
              {routes && routes.map((adminRoute, i) => (
                <li
                  key={i}
                  className="rounded-md border border-transparent hover:border-primary transition-colors duration-300"
                >
                  <NavLink
                    to={adminRoute.path}
                    className={({ isActive }) =>
                      "block px-4 py-3 font-medium rounded-md transition-colors duration-300 " +
                      (isActive
                        ? "bg-primary text-primary-content border-primary"
                        : "hover:bg-primary hover:text-primary-content border-transparent bg-base-300 text-base-content")
                    }
                  >
                    {adminRoute.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavber;
