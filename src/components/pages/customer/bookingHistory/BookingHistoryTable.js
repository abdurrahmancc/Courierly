import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosPrivet from '../../../hooks/axiosPrivet';
import Loading from '../../../sharedPages/Loading';
import BookingHistoryTableRow from './BookingHistoryTableRow';
import CancelBookingModel from './CancelBookingModel';

const BookingHistoryTable = () => {
      const [cancelBookModal, setCancelBookModal] = useState(null);
      const { data, isLoading, isError, error, refetch } = useQuery("myParcels", async () => await axiosPrivet.get("parcel/my"));

  if (isLoading) return <Loading/>;
  if (isError) return <p>Error: {error.message}</p>;
    return (
            <div className="pt-6">
      <div className="overflow-x-auto w-full pb-[6.5rem] h-[calc(100vh-300px)]">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="order_Table_Row" className="cursor-pointer ">
            {/* <!-- row 1 --> */}
            {data?.data &&
              data.data.map((book, index) => (
                <BookingHistoryTableRow
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

export default BookingHistoryTable;