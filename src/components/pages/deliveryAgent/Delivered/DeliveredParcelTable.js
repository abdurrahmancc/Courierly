import React from 'react';
import Loading from '../../../shared/Loading';
import axiosPrivet from '../../../hooks/axiosPrivet';
import DeliveredParcelTableRow from './DeliveredParcelTableRow';
import { useQuery } from 'react-query';

const DeliveredParcelTable = () => {
   const { data, isLoading, isError, error, refetch } = useQuery(
    "deliveredParcels",
    async () => await axiosPrivet.get(`parcel/getDeliveredParcelsByStatus/Delivered`)
  );
  

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <div className="pt-6">
      <div className="overflow-x-auto w-full pb-[6.5rem] h-[calc(100vh-300px)]">
        {/* ========= table start ====== */}
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
            </tr>
          </thead>
          <tbody id="order_Table_Row" className="cursor-pointer ">
            {data?.data &&
              data.data.map((book, index) => (
                <DeliveredParcelTableRow
                  key={index}
                  book={book}
                  index={index}
                />
              ))}
          </tbody>
        </table>
        {/* ========= table end ====== */}
      </div>
    </div>
  );
};


export default DeliveredParcelTable;