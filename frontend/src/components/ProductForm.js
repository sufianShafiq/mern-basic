// components/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ProductForm({ fetchData, isEdit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ _id: '', name: '', price: 0 });

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        const result = await axios.get(`http://localhost:5000/items/${id}`);
        setForm(result.data);
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await axios.put(`http://localhost:5000/items/${id}`, form);
    } else {
      form._id = null;
      await axios.post('http://localhost:5000/items', form);
    }

    fetchData();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleInputChange}
        placeholder="Price"
        required
      />
      <button type="submit" className={isEdit ? 'update-btn' : 'submit-btn'}>
        {isEdit ? 'Update' : 'Submit'}
      </button>
    </form>
  );
}

export default ProductForm;