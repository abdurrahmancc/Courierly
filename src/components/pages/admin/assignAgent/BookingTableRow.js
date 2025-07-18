import React from 'react';
import { BsThreeDots } from 'react-icons/bs';

const BookingTableRow = ({ book, index, handleCheckboxChange, isSelected }) => {
    return (
    <tr className="hover" key={book?._id}>
      <td><input type="checkbox"
          checked={isSelected}
          onChange={(e) => handleCheckboxChange(book._id, e.target.checked)} className="checkbox rounded-[2px] checkbox-sm" /></td>
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

export default BookingTableRow;