import React from "react";

const EditableRowProducts = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a product name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a price..."
          name="price"
          value={editFormData.price}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter inventory..."
          name="inventory"
          value={editFormData.inventory}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">
            Save
        </button>
        <button 
        type="button" 
        onClick={handleCancelClick}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRowProducts;