import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlinePlus } from "react-icons/hi";
import { MdOutlineShoppingCart, MdPending } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { GrDeliver } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import axiosPrivet from "../../../hooks/axiosPrivet";

const TrackParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState();
  const [refetch, setRefetch] = useState(false);
    const [searchId, setSearchId] = useState("");

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const { data: parcel } = await axiosPrivet.get(`parcel/${id}`);
          console.log(parcel);
          setParcel(parcel);
        } catch (error) {
          console.error("Failed to fetch parcel:", error);
        }
      }
    })();
  }, [id, refetch]);

  const statusSteps = ["Pending", "PickedUp", "InTransit", "Delivered"];
  const currentStatusIndex = statusSteps.indexOf(parcel?.status);


  const handleSerarchOrder = async (e) => {
    e.preventDefault();
    if (!searchId) return;

    try {
      const { data: parcel } = await axiosPrivet.get(`parcel/${searchId}`);
      console.log(parcel);
      setParcel(parcel);
    } catch (error) {
      console.error("Failed to fetch parcel:", error);
    }
  };

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
            <form onSubmit={handleSerarchOrder}>
              <label className="relative w-[250px] md:block max-w-xs hidden">
                <button
                  type="submit"
                  className="absolute inset-y-0 right-2 rounded pr-1 flex items-center pl-2"
                >
                  <BiSearchAlt className="text-2xl text-gray-400" />
                </button>
                <input
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="placeholder:italic placeholder:text-slate-400 block bg-base-100 w-full py-2 pl-6 pr-9 shadow-sm focus:outline-none focus:border-0 rounded-full focus:ring-0 sm:text-sm"
                  placeholder="Enter Track Id..."
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
        <div className="overflow-y-auto w-full h-[calc(100vh-376px)] mt-[100px]">
          {parcel && (
            <>
              <div className="flex justify-center">
                <div className="w-full max-w-[700px]">
                  <ul className="steps steps-horizontal w-full">
                    {statusSteps.map((step, index) => (
                      <li
                        key={step}
                        className={`step ${
                          index <= currentStatusIndex ? "step-primary" : ""
                        }`}
                      >
                        <span className="step-icon">
                          {step === "Pending" && <MdPending />}
                          {step === "PickedUp" && <MdOutlineShoppingCart />}
                          {step === "InTransit" && <GrDeliver />}
                          {step === "Delivered" && <FaCheck />}
                        </span>

                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-20 w-full flex justify-center">
                <div className="max-w-[80%] w-full">
                  <ul>
                    {(parcel?.trackingLogs || [])
                      .slice()
                      .reverse()
                      .map((log, index) => (
                        <li className="flex gap-10" key={index}>
                          <div className="mt-1">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                          <div
                            style={{
                              width:
                                index === [...parcel?.trackingLogs].length - 1
                                  ? ""
                                  : "1px",
                            }}
                            className="relative m-[0 10px] top-[3px] rounded-full bg-[#747373] inline-block"
                          >
                            <div className="max-w-[28px] w-[28px] h-[28px] rounded-full max-h-[28px] bg-[#42424a] absolute ml-[50%] translate-x-[-50%]">
                              <div
                                style={{ display: index !== 0 ? "none" : "" }}
                                className="flex justify-center items-center h-full"
                              >
                                <FaCheck />
                              </div>
                            </div>
                          </div>
                          <div className="mb-14 -mt-2">
                            <p>{log.customStatus}</p>
                            <span>{log.message}</span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackParcel;
