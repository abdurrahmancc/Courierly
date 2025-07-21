import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosPrivet from "../../../hooks/axiosPrivet";
import Loading from "../../../shared/Loading";
import BookingTableRow from "./BookingTableRow";
import { toast } from "react-toastify";

const BookingTable = ({ selectAgent }) => {
  const [cancelBookModal, setCancelBookModal] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
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
      console.log("esult.data", result.data);
      if (result.data.success) {
        toast.success(result.data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery(
    "parcels",
    async () => await axiosPrivet.get("parcel/getNewParcels")
  );

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="pt-6">
      {data?.data.length > 0 ? (
        <div className="overflow-x-auto w-full max-h-[calc(100vh-300px)] ">
          {/* ========= table start ====== */}
          <table className="table w-full ">
            {/* <!-- head --> */}
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
              </tr>
            </thead>
            <tbody id="order_Table_Row" className="cursor-pointer ">
              {/* <!-- row 1 --> */}
              {data?.data &&
                data.data.map((book, index) => (
                  <BookingTableRow
                    key={index}
                    book={book}
                    index={index}
                    handleCheckboxChange={handleCheckboxChange}
                    isSelected={selectedBookings.includes(book._id)}
                  />
                ))}
            </tbody>
          </table>
          {/* ========= table end ====== */}
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          No new parcels found.
        </div>
      )}
      <div onClick={() => handleAssign()} className="flex justify-end">
        <button className="btn btn-success ">Assign</button>
      </div>
    </div>
  );
};

export default BookingTable;
