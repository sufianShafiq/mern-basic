import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ _id: '', name: '', price: 0 });
  const [editing, setEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios.get('http://localhost:5000/');
    setData(result.data);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(true);
    setItemToEdit(item);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
    fetchData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editing) {
      await axios.put(`http://localhost:5000/items/${itemToEdit._id}`, form);
      setEditing(false);
    } else {
      form._id = null;
      console.log(form._id);
      await axios.post('http://localhost:5000/items', form);
    }

    fetchData();
    setForm({ _id: '', name: '', price: 0 });
  };

  return (
    <div className="container">
      <h1>Product Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Name"
          required // Add required attribute for form validation
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleInputChange}
          placeholder="Price"
          required // Add required attribute for form validation
        />
        <button type="submit" className={editing ? 'update-btn' : 'submit-btn'}>
          {editing ? 'Update' : 'Submit'}
        </button>
      </form>
      <div className="product-list">
        {data.map((item) => (
          <div key={item._id} className="product-item">
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <div className="button-container">
              <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
