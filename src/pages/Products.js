import React, { useState, useEffect, Fragment } from "react";
import { nanoid } from "nanoid";
import "./Table.css";
import ReadOnlyRowProducts from "../components/ReadOnlyRowProducts.js";
import EditableRowProducts from "../components/EditableRowProducts";

//http://localhost:60319/api/products
//https://api.npoint.io/cffc6503bfc34e741c1a

function Product() {

  const [products, setProducts] = useState([]);
     

  useEffect(() => { 
    const api_url = 
    "https://api.npoint.io/cffc6503bfc34e741c1a";

    const fetchData = async () => {
        try {
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
            setProducts(json);
        } catch (error) {
            console.log("error", error);
        }
      }

      fetchData();
  }, []);

  const [addFormData, setAddFormData] = useState({
    name: "",
    price: "",
    inventory: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    inventory: "",
  })

  const [editProductId, setEditProductId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: nanoid(),
      name: addFormData.name,
      price: addFormData.price,
      inventory: addFormData.inventory,
    };

    const newProducts = [...products, newProduct];
    setProducts(newProducts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedProduct = {
      id: editProductId,
      name: addFormData.name,
      price: addFormData.price,
      inventory: addFormData.inventory,
    };

    const newProducts = [...products];

    const index = products.findIndex((product) => product.id === editProductId);

    newProducts[index] = editedProduct;

    setProducts(newProducts);
    setEditProductId(null);
  }

  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id);

    const formValues = {
      name: product.name,
      price: product.price,
      inventory: product.inventory,
    }

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditProductId(null);
  }

  const handleDeleteClick = (productId) => {
    const newProducts = [...products];

    const index = products.findIndex((product) => product.id === productId);

    newProducts.splice(index, 1);

    setProducts(newProducts);
  }

  return (
  <div className="products">
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Inventory</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <Fragment>
            { editProductId === product.id ?(
              <EditableRowProducts 
              editFormData={editFormData} 
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              />
              ) : ( 
              <ReadOnlyRowProducts 
                product={product} 
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
              )}
          </Fragment>
        ))}
      </tbody>
    </table>
    </form>
    <h2>Add a product</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input 
      type="text" 
      name="name" 
      required="required"
      placeholder="Enter product naame..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="price" 
      required="required"
      placeholder="Enter product price..."
      onChange={handleAddFormChange}
      />
            <input 
      type="text" 
      name="inventory" 
      required="required"
      placeholder="Enter product inventory..."
      onChange={handleAddFormChange}
      />
      <button type="submit">Add</button>
    </form>
    </div>
  );
};

export default Product;
