import React from "react";
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlinePlus } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";

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
        {/* <UsersTable /> */}
      </div>
    </div>
  );
};

export default TrackParcel;
