import React, { useEffect, useState } from "react";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Parcel = () => {
  const [parcel, setParcel] = useState();
  const [refetch, setRefetch] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const { data: parcel } = await axiosPrivet.get(`parcel/${id}`);
        console.log(parcel);
        setParcel(parcel);
      } catch (error) {
        console.error("Failed to fetch parcel:", error);
      }
    })();
  }, [id, refetch]);

  const handleStatus = async (id, status) => {
    try {
      const { data } = await axiosPrivet.patch(`parcel/${id}/status`, {
        status: status,
      });
      setRefetch((prev) => !prev);
      console.log(data.message);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="p-10 w-full">
      <div className="flex items-center justify-between pb-6">
        <h4 className="uppercase text-[1.4vw] text-white font-bold">
          Parcel Details
        </h4>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1 btn-success">
            Update Status
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button
                onClick={() => handleStatus(parcel?._id, "PickedUp")}
                disabled={
                  parcel?.status === "PickedUp" ||
                  parcel?.status === "InTransit" ||
                  parcel?.status === "Delivered"
                }
                className={`btn py-5  btn-sm ${
                  parcel?.status === "PickedUp" ||
                  parcel?.status === "InTransit" ||
                  parcel?.status === "Delivered"
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                PickedUp
              </button>
            </li>
            <li className="mt-1">
              <button
                onClick={() => handleStatus(parcel?._id, "InTransit")}
                disabled={
                  parcel?.status === "InTransit" ||
                  parcel?.status === "Delivered"
                }
                className={`btn py-5  btn-sm ${
                  parcel?.status === "InTransit" ||
                  parcel?.status === "Delivered"
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                InTransit
              </button>
            </li>
            <li className="mt-1">
              <button
                onClick={() => handleStatus(parcel?._id, "Delivered")}
                disabled={parcel?.status === "Delivered"}
                className={`btn py-5 btn-sm ${
                  parcel?.status === "Delivered"
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                Delivered
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* ==================== Parcel Details ====================== */}
      <div className="bg-base-200 rounded-xl p-6 text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-216px)]">
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="font-bold text-lg pb-5">Parcel Info</h2>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Type:</span> {parcel?.parcelType}
            </p>
            <p>
              <span className="font-semibold">Size:</span> {parcel?.parcelSize}
            </p>
            <p>
              <span className="font-semibold">COD:</span>{" "}
              {parcel?.isCOD ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Amount:</span> ৳{parcel?.amount}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {parcel?.status}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="font-bold text-lg pb-5">Pickup & Delivery</h2>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Pickup Address:</span>{" "}
              {parcel?.pickupAddress}
            </p>
            <p>
              <span className="font-semibold">Delivery Address:</span>{" "}
              {parcel?.deliveryAddress}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="font-bold text-lg pb-5">Receiver Info</h2>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {parcel?.receiverName}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {parcel?.receiverPhone}
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="font-bold text-lg pb-5">Customer Info</h2>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {parcel?.userId?.displayName}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {parcel?.userId?.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {parcel?.userId?.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parcel;
