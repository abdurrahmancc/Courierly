import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import UsersTable from "./UsersTable";
import Loading from "../../../shared/Loading";

const AllUsers = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery(
    "getAllUsers",
    async () => await axiosPrivet.get("users")
  );

  if (isLoading) return <Loading/>;
  // if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-10 w-full">
      <div className="flex justify-between pb-4">
        <h4 className="uppercase text-[1.4vw]   text-white font-bold">
          all users
        </h4>
      </div>
      <div className="bg-base-200 p-5">
        <div className="flex justify-between">
          <div>
            <form>
              <label className={`relative w-[250px]  md:block max-w-xs hidden `} >
                <button
                  type="submit"
                  className="absolute inset-y-0 right-2 rounded pr-1  flex items-center pl-2"
                >
                  <BiSearchAlt className="text-2xl text-gray-400" />
                </button>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-base-100 w-full  py-2 pl-6  pr-9 shadow-sm focus:outline-none focus:border-0 rounded-full  focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="text"
                  name="search"
                />
              </label>
            </form>
          </div>
          <div>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-sm capitalize font-normal  text-neutral rounded-full btn-success"
            >
              <HiOutlinePlus className="" /> New User
            </button>
          </div>
        </div>
        <UsersTable />
      </div>
    </div>
  );
};

export default AllUsers;
