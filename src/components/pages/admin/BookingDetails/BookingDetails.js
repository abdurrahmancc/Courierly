import React, { useEffect, useState } from "react";
import axiosPrivet from "../../../hooks/axiosPrivet";
import { useParams } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import AssignAgentModel from "../NewBookings/AssignAgentModel";

const BookingDetails = () => {
  const [parcel, setParcel] = useState();
  const [selectAgent, setSelectAgent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
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
  }, [id, refreshTrigger]);

  const handleAssign = async () => {
    try {
      const result = await axiosPrivet.post("/parcel/multipleAssignParcel", {
        parcelIds: [parcel?._id],
        agentId: selectAgent?.user?._id,
      });
      if (result.data.success) {
        toast.success(result.data.message);
        setShowModal(!showModal);
        setRefreshTrigger((prev) => !prev);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className="p-10 w-full">
      <div className="flex items-center justify-between pb-6">
        <h4 className="uppercase text-[1.4vw] text-white font-bold">
          Booking Details
        </h4>
        {!parcel?.isAssigned > 0 && (
          <div>
            <label htmlFor="AssignAgentModel" className="">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary "
              >
                Select Agent
              </button>
            </label>
          </div>
        )}
      </div>

      {/* ==================== Parcel Details ====================== */}
      <div className="bg-base-200 rounded-xl p-6 text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-208px)]">
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

        {parcel?.assignedAgentId && (
          <div className="card bg-base-100 shadow-md p-4">
            <h2 className="font-bold text-lg">Assigned Agent</h2>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {parcel?.assignedAgentId?.displayName}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {parcel?.assignedAgentId?.email}
            </p>
          </div>
        )}

        {showModal && (
          <AssignAgentModel
            handleAssign={handleAssign}
            setSelectAgent={setSelectAgent}
            onClose={() => setShowModal(false)}
            selectAgent={selectAgent}
          />
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
