import React from "react";

const ReadOnlyRowOrders = ({ order, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{order.customerId}</td>
      <td>{order.orderDate}</td>
      <td>{order.productId}</td>
      <td>{order.quantity}</td>
      <td>{order.unitPrice}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, order)}
        >
          Edit
        </button>
        <button type="button" 
        onClick={() => handleDeleteClick(order.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRowOrders;