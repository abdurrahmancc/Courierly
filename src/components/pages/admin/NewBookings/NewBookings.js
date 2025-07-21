import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import NewBookingsTable from './NewBookingsTable';

const NewBookings = () => {
  return (
    
    <div className="p-10 w-full">
      <div className="flex justify-between pb-4">
        <h4 className="uppercase text-[1.4vw]   text-white font-bold">
          New Bookings
        </h4>
      </div>
      <div className="bg-base-200 p-5">
        <NewBookingsTable />
      </div>
    </div>
  );
};

export default NewBookings;