import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-product', product, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Product added successfully');
    } catch (err) {
      alert('Error adding product');
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Product Name" onChange={handleChange} /><br />
        <input type="text" name="description" placeholder="Description" onChange={handleChange} /><br />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} /><br />
        <input type="text" name="image" placeholder="Image URL" onChange={handleChange} /><br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminPanel;
