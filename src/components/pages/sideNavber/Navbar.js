import React, { useEffect, useState } from "react";
import { accessToken, removeCookie } from "../../hooks/useCookies";
import { useNavigate } from "react-router-dom";
import { socket } from "../../../utils/socket";
import axiosPrivet from "../../hooks/axiosPrivet";
import { useQuery } from "react-query";
import Notification from "./notifications/Notification";
import Notifications from "./notifications/Notifications";
import { VscThreeBars } from "react-icons/vsc";


const Navbar = () => {
  const navigate = useNavigate();
  

  const handleSignOut = () => {
    removeCookie(accessToken);
    navigate("/Login");
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        <label
            htmlFor="my-drawer-2"
            className="drawer-button lg:hidden cursor-pointer"
          >
            <VscThreeBars className="text-[24px]" />
          </label>
      </div>
      <div className="flex-none flex items-center gap-10">
        <Notifications/>
        <div className="dropdown dropdown-end">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={handleSignOut}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
