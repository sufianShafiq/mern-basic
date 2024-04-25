// components/ProductItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProductItem({ item, fetchData }) {
  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/items/${item._id}`);
    fetchData();
  };

  return (
    <div className="product-item">
      <p><strong>Name:</strong> {item.name}</p>
      <p><strong>Price:</strong> ${item.price}</p>
      <div className="button-container">
        <Link to={`/edit/${item._id}`} className="edit-btn">Edit</Link>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
}

export default ProductItem;