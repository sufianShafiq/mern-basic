// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/');
    setData(result.data);
  };

  return (
    <Router> 
      <div className="container">
        <h1>Product Manager</h1>
        <Routes>
          <Route path="/" element={<ProductList data={data} fetchData={fetchData} />} />
          <Route path="/add" element={<ProductForm fetchData={fetchData} />} /> 
          <Route path="/edit/:id" element={<ProductForm fetchData={fetchData} isEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;