// components/ProductList.js
import React from 'react';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';
function ProductList({ data, fetchData }) {
  return (
    <>
    <Link to={`/add`} className="edit-btn">Add</Link> 
    <div className="product-list"> 
      {data.map((item) => (
        <ProductItem key={item._id} item={item} fetchData={fetchData} />
      ))}
    </div></>
  );
}

export default ProductList;