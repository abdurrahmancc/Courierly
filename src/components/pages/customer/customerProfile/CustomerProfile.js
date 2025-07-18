import React from "react";
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlinePlus } from 'react-icons/hi';
import SetupProfileFrom from "./SetupProfileFrom";

const CustomerProfile = () => {
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between pb-4">
        <h4 className="uppercase text-[28px]   text-white font-bold">
          customer profile
        </h4>
      </div>
      <div className="bg-base-200 p-5 ">
        <SetupProfileFrom/>
      </div>
    </div>
  );
};

export default CustomerProfile;
