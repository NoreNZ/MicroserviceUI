import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import "./Table.css";
//import data from "./mock-data";
import ReadOnlyRowOrders from "../components/ReadOnlyRowOrders.js";
import EditableRowOrders from "../components/EditableRowOrders.js";

//https://api.npoint.io/db8936f9a89036178988
//https://api.npoint.io/58e2e5bf3b87c0c98696

function Order() {

  const [orders, setOrders] = useState([]);
     

  useEffect(() => { 
    const api_url = 
    "https://api.npoint.io/58e2e5bf3b87c0c98696";

    const fetchData = async () => {
        try {
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
            setOrders(json);
        } catch (error) {
            console.log("error", error);
        }
      }

      fetchData();
  }, []);

  const [addFormData, setAddFormData] = useState({
    customerId: "",
    orderDate: "",
    productId: "",
    quantity: "",
    unitPrice: "",
  });

  const [editFormData, setEditFormData] = useState({
    customerId: "",
    orderDate: "",
    productId: "",
    quantity: "",
    unitPrice: "",
  })

  const [editOrderId, setEditOrderId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("productId");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("productId");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newOrder = {
      id: nanoid(),
      customerId: addFormData.customerId,
      orderDate: addFormData.orderDate,
      productId: addFormData.productId,
      quantity: addFormData.quantity,
      unitPrice: addFormData.unitPrice,
    };

    const newOrders = [...orders, newOrder];
    setOrders(newOrders);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedOrder = {
      id: editOrderId,
      customerId: addFormData.customerId,
      orderDate: addFormData.orderDate,
      productId: addFormData.productId,
      quantity: addFormData.quantity,
      unitPrice: addFormData.unitPrice,
    };

    const newOrders = [...orders];

    const index = orders.findIndex((order) => order.id === editOrderId);

    newOrders[index] = editedOrder;

    setOrders(newOrders);
    setEditOrderId(null);
  }

  const handleEditClick = (event, order) => {
    event.preventDefault();
    setEditOrderId(order.id);

    const formValues = {
      customerId: order.customerId,
      orderDate: order.orderDate,
      productId: order.productId,
      quantity: order.quantity,
      unitPrice: order.unitPrice,
    }

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditOrderId(null);
  }

  const handleDeleteClick = (orderId) => {
    const newOrders = [...orders];

    const index = orders.findIndex((order) => order.id === orderId);

    newOrders.splice(index, 1);

    setOrders(newOrders);
  }

  return (
  <div className="orders">
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Customer ID</th>
          <th>Order Date</th>
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <Fragment>
            { editOrderId === order.id ?(
              <EditableRowOrders 
              editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              />
              ) : ( 
              <ReadOnlyRowOrders 
                order={order} 
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
              )}
          </Fragment>
        ))}
      </tbody>
    </table>
    </form>

    <h2>Add an order</h2>
    <form onSubmit={handleAddFormSubmit}>
    <input 
      type="text" 
      name="customerId" 
      required="required"
      placeholder="Enter a customer ID..."
      onChange={handleAddFormChange}
      />
      <input 
      type="text" 
      name="orderDate" 
      required="required"
      placeholder="Enter a date..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="productId" 
      required="required"
      placeholder="Enter a product ID..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="quantity" 
      required="required"
      placeholder="Enter a quantity..."
      onChange={handleAddFormChange}
      />
            <input 
      type="email" 
      name="unitPrice" 
      required="required"
      placeholder="Enter a unit price..."
      onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
  </div>
  );
};

export default Order;
