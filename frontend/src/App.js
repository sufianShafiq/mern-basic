import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    console.log(itemToEdit)
    if (editing) {
      await axios.put(`http://localhost:5000/items/${itemToEdit._id}`, form);
      setEditing(false);
    } else {
      await axios.post('http://localhost:5000/items', form);
    }

    fetchData();
    setForm({ _id: '', name: '', price: 0 });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleInputChange}
          placeholder="price"
        />
        <button type="submit">{editing ? 'Update' : 'Submit'}</button>
      </form>
      {data.map((item) => (
        <div key={item._id}>
          <p>Name: {item.name}</p>
          <p>price: {item.price}</p>
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
