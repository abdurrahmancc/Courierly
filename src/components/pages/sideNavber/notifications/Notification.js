import React from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification, handleCloseNotification }) => {
  const { _id, title, description, targetId } = notification;
  console.log("notification", notification)
  const navigate = useNavigate()
  return (
    <div
     onClick={(e)=>{navigate(`/admin/bookings/${targetId}`); handleCloseNotification(_id)}}
      key={_id}
      className="bg-base-100 rounded-lg shadow-md cursor-pointer p-3 flex items-center text-start justify-between gap-2"
    >
      <div className="flex-1">
        <h3
          className="text-sm font-semibold text-gray-100"
          title={title.length > 25 ? title : undefined}
        >
          {title.length > 25 ? `${title.slice(0, 25)}...` : title}
        </h3>
        <p
          className="text-xs text-gray-400 mt-1"
          title={description.length > 40 ? description : undefined}
        >
          {description.length > 40 ? `${description.slice(0, 40)}...` : description}
        </p>
      </div>

      <div
        onClick={(e) => {handleCloseNotification(_id); e.stopPropagation() }}
        className="text-gray-300 hover:text-red-400 cursor-pointer"
      >
        <IoMdClose size={16} />
      </div>
    </div>
  );
};

export default Notification;
