import React from 'react';
import AssignedParcelsTabelRow from './AssignedParcelsTabelRow';
import Loading from '../../../shared/Loading';
import { useQuery } from 'react-query';
import axiosPrivet from '../../../hooks/axiosPrivet';
import { toast } from 'react-toastify';

const AssignedParcelsTabel = () => {
  const { data, isLoading, isError, error, refetch } = useQuery(
    "parcels",
    async () => await axiosPrivet.get("parcel/assigned")
  );
  const handleStatus =async(id,status)=>{
   try {
    const {data} = await axiosPrivet.patch(`parcel/${id}/status`,{status: status})
    refetch()
    console.log(data.message)
    toast.success(data.message)
   } catch (error) {
    toast.error(error.message)
    console.log(error.message)
   }
  }

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
                <AssignedParcelsTabelRow
                  key={index}
                  book={book}
                  index={index}
                  handleStatus={handleStatus}
                />
              ))}
          </tbody>
        </table>
        {/* ========= table end ====== */}
      </div>
    </div>
  );
};

export default AssignedParcelsTabel;