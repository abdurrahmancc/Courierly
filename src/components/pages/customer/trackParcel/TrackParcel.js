import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import { MdOutlineShoppingCart, MdPending } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GrDeliver } from "react-icons/gr";
import { GiStorkDelivery } from "react-icons/gi";
import { FaCheck } from "react-icons/fa";

const TrackParcel = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between pb-4">
        <h4 className="uppercase text-[1.4vw]   text-white font-bold">
          traking parcel
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
          <div>
            <button
              onClick={() => navigate("/customer/book-parcel")}
              className="btn btn-sm capitalize font-normal  text-neutral rounded-full btn-success"
            >
              <HiOutlinePlus className="" /> Book a Parcel
            </button>
          </div>
        </div>
        <div className="overflow-y-auto w-full h-[calc(100vh-276px)] mt-[100px]">
          <div className="flex justify-center">
            <div className="w-full max-w-[700px]">
              <ul className="steps steps-horizontal  w-full">
                <li className="step step-primary">
                  <span className="step-icon">
                    <MdPending />
                  </span>
                  Pending
                </li>
                <li className="step step-primary">
                  <span className="step-icon">
                    <MdOutlineShoppingCart />
                  </span>
                  PickedUp
                </li>
                <li className="step">
                  <span className="step-icon">
                    <GrDeliver />
                  </span>
                  InTransit
                </li>
                <li className="step">
                  <span className="step-icon">
                    <FaCheck />
                  </span>
                  Delivered
                </li>
              </ul>
              <ul className="steps steps-vertical">
                <li className="step">
                  <span className="step-icon">
                    <FaCheck />
                  </span>
                  Delivered
                </li>
                <li className="step">
                  <span className="step-icon">
                    <FaCheck />
                  </span>
                  Delivered
                </li>
                <li className="step">
                  <span className="step-icon">
                    <FaCheck />
                  </span>
                  Delivered
                </li>
                <li className="step">
                  <span className="step-icon">
                    <FaCheck />
                  </span>
                  <div className="text-start">
                    <p className="text-xs">Order Processing</p>
                    <span className="text-[8px]">29 May 17:08</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackParcel;
