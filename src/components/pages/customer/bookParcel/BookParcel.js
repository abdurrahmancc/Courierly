import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ParcelBookingForm from "./ParcelBookingForm";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { toast } from "react-toastify";


const BookParcel = () => {
  const navigate = useNavigate();
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between pb-4">
        <h4 className="uppercase text-[1.4vw]   text-white font-bold">
            Book a Parcel
        </h4>
      </div>
      <div className="bg-base-200 p-5">
        <ParcelBookingForm/>
      </div>
    </div>
  );
};

export default BookParcel;
