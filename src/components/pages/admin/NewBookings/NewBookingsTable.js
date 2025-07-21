import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosPrivet from "../../../hooks/axiosPrivet";
import Loading from "../../../shared/Loading";
import CancelBookingModel from "../../customer/bookingHistory/CancelBookingModel";
import { toast } from "react-toastify";
import AssignAgentModel from "./AssignAgentModel";
import NewBookingsTableRow from "./NewBookingsTableRow";
import { useNavigate } from "react-router-dom";

const NewBookingsTable = () => {
  const [selectAgent, setSelectAgent] = useState(null);
  const [cancelBookModal, setCancelBookModal] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
     const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useQuery(
    "pendingParcels",
    async () => await axiosPrivet.get("parcel/getNewParcels")
  );

  const handleCheckboxChange = (bookingId, isChecked) => {
    if (isChecked) {
      setSelectedBookings((prev) => [...prev, bookingId]);
    } else {
      setSelectedBookings((prev) => prev.filter((id) => id !== bookingId));
    }
  };

  const handleAssign = async () => {
    try {
      const result = await axiosPrivet.post("/parcel/multipleAssignParcel", {
        parcelIds: selectedBookings,
        agentId: selectAgent?.user?._id,
      });
      if (result.data.success) {
        toast.success(result.data.message);
        setShowModal(!showModal);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="pt-6">
      <div className="overflow-x-auto w-full h-[calc(100vh-265px)]">
        {/* ========= table start ====== */}

        {data?.data.length > 0 ? (
          <table className="table w-full ">
            <thead>
              <tr>
                <th>#</th>
                <th>Receiver Name</th>
                <th>Receiver Phone</th>
                <th>Status</th>
                <th>Amount</th>
                <th>COD</th>
                <th>Pickup Address</th>
                <th>Delivery Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="order_Table_Row" className="cursor-pointer ">
              {data?.data &&
                data.data.map((book, index) => (
                  <NewBookingsTableRow
                    key={index}
                    book={book}
                    index={index}
                    refetch={refetch}
                    setCancelBookModal={setCancelBookModal}
                    handleCheckboxChange={handleCheckboxChange}
                    isSelected={selectedBookings.includes(book._id)}
                  />
                ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center  py-10">
            No new bookings found.
          </div>
        )}

        {selectedBookings.length > 0 && (
          <div className="flex justify-end mt-10">
            <label htmlFor="AssignAgentModel" className="">
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary rounded-full  btn-sm "
              >
                Select Agent
              </button>
            </label>
          </div>
        )}

        {/* ========= table end ====== */}
        {/* ========= delete modal start ====== */}
        {cancelBookModal && (
          <CancelBookingModel
            cancelBookModal={cancelBookModal}
            setCancelBookModal={setCancelBookModal}
            refetch={refetch}
          />
        )}
        {/* ========= delete modal end ====== */}
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

export default NewBookingsTable;
