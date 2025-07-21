import React, { useState } from 'react';
import Loading from '../../../shared/Loading';
import axiosPrivet from '../../../hooks/axiosPrivet';
import { useQuery } from 'react-query';
import CancelBookingModel from '../../customer/bookingHistory/CancelBookingModel';
import AllBookingsTableRow from './AllBookingsTableRow';

const AllBookingsTable = () => {
   const [cancelBookModal, setCancelBookModal] = useState(null);
  const { data, isLoading, isError, error, refetch } = useQuery(
    "parcels",
    async () => await axiosPrivet.get("parcel/")
  );

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="pt-6">
      <div className="overflow-x-auto w-full h-[calc(100vh-300px)]">
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
              <th>IsAssigned</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="order_Table_Row" className="cursor-pointer ">
            {data?.data &&
              data.data.map((book, index) => (
                <AllBookingsTableRow
                  key={index}
                  book={book}
                  index={index}
                  refetch={refetch}
                  setCancelBookModal={setCancelBookModal}
                />
              ))}
          </tbody>
        </table>
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
      </div>
    </div>
  );
};


export default AllBookingsTable;