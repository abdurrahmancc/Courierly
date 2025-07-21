import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import AssignedParcelsTabel from "./AssignedParcelsTabel";
import { BiSearchAlt } from "react-icons/bi";

const AssignedParcels = () => {
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between pb-4">
        <h4 className="uppercase text-[1.4vw]   text-white font-bold">
          Assgined to me
        </h4>
      </div>
      <div className="bg-base-200 p-5">
        <div className="flex justify-between">
          <div>
            <form>
              <label
                className={`relative w-[250px]  md:block max-w-xs hidden `}
              >
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
          <div></div>
        </div>
        <AssignedParcelsTabel />
      </div>
    </div>
  );
};

export default AssignedParcels;
