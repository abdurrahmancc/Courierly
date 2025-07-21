import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const AssignedParcelsTabelRow = ({book, index, handleStatus}) => {
  const navigate = useNavigate();
    return (
    <tr className="hover" key={book?._id} onClick={(e)=> {navigate(`/agent/parcel/${book?._id}`)}}>
      <td>{index + 1}</td>
      <td>{book.receiverName}</td>
      <td>{book.receiverPhone}</td>
      <td>{book.status}</td>
      <td>{book.amount}</td>
      <td>{book.isCOD ? "Yes" : "No"}</td>
      <td>{book.pickupAddress}</td>
      <td>{book.deliveryAddress}</td>
    </tr>
    );
};
export default AssignedParcelsTabelRow;