import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


const AllBookingsTableRow = ({book, index, setCancelBookModal, refetch}) => {
  const navigate = useNavigate();
    return (
    <tr className="hover" key={book?._id} onClick={()=> navigate(`${book?._id}`)}>
      <td>{index + 1}</td>
      <td>{book.receiverName}</td>
      <td>{book.receiverPhone}</td>
      <td>{book.status}</td>
      <td>{book.amount}</td>
      <td>{book.isCOD ? "Yes" : "No"}</td>
      <td>{book.pickupAddress}</td>
      <td>{book.deliveryAddress}</td>
      <td>{book.isAssigned ? "Yes":"No"}</td>
      <td>
        <div className="dropdown dropdown-end" onClick={(e) => e.stopPropagation()}>
          <label tabIndex={0} className="btn btn-sm m-1">
            <BsThreeDots />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li onClick={() => setCancelBookModal(book)}>
              <label htmlFor="CancelBooking" className="">
                  Cancel
              </label>
            </li>
            <li>
              <span>Details</span>
            </li>
          </ul>
        </div>
      </td>
    </tr>
    );
};

export default AllBookingsTableRow;