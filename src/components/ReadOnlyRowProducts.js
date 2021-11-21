import React from "react";

const ReadOnlyRowProducts = ({ product, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.inventory}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, product)}
        >
          Edit
        </button>
        <button type="button" 
        onClick={() => handleDeleteClick(product.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRowProducts;