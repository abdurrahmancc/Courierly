import React from 'react';

const DeliveredParcelTableRow = ({book, index}) => {
    return (
    <tr className="hover" key={book?._id}>
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

export default DeliveredParcelTableRow;