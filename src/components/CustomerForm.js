import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerForm.css';

const CustomerForm = ({ initialValues, isEditing }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferences: {
      fabricType: '',
      colors: [],
      designs: []
    },
    purchaseHistory: [],
    followUp: []
  });

  // Load initialValues if editing
  useEffect(() => {
    if (isEditing && initialValues) {
      setCustomer(initialValues);
    }
  }, [initialValues, isEditing]);

  // General handleChange for basic input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handling preferences separately
  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      preferences: {
        ...customer.preferences,
        [name]: value.split(',').map(item => item.trim()) // Splitting input by commas
      }
    });
  };

  // Purchase history parsing
  
const handlePurchaseHistoryChange = (e) => {
  const { value } = e.target;
  if (!value) {
    setCustomer({ ...customer, purchaseHistory: [] });
    return;
  }

  const items = value.split(';').map(item => {
    const [product = '', quantity = '', purchaseDate = ''] = item.split(',');
    
    // Check if purchaseDate is valid
    const parsedDate = new Date(purchaseDate.trim());
    const isValidDate = !isNaN(parsedDate.getTime());

    return {
      product: product.trim(),
      quantity: Number(quantity.trim()) || 0, // Ensure quantity is a number
      purchaseDate: isValidDate ? parsedDate : new Date() // Default to current date if invalid
    };
  });

  setCustomer({ ...customer, purchaseHistory: items });
};


  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:10000/api/customers/${customer._id}`, customer);
        alert('Customer updated successfully');
      } else {
        await axios.post('http://localhost:10000/api/customers', customer);
        alert('Customer created successfully');
        
        // Clear the form after submission
        setCustomer({
          name: '',
          email: '',
          phone: '',
          address: '',
          preferences: {
            fabricType: '',
            colors: [],
            designs: []
          },
          purchaseHistory: [],
          followUp: []
        });
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('Error occurred while submitting.');
    }
  };

  return (
    <form className="customer-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Edit Customer" : "Create Customer"}</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={customer.name}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={customer.email}
        onChange={handleChange}
        required
      />

      <label>Phone:</label>
      <input
        type="text"
        name="phone"
        value={customer.phone}
        onChange={handleChange}
        required
      />

      <label>Address:</label>
      <input
        type="text"
        name="address"
        value={customer.address}
        onChange={handleChange}
        required
      />

      <label>Fabric Type:</label>
      <input
        type="text"
        name="fabricType"
        value={customer.preferences.fabricType}
        onChange={handlePreferencesChange}
      />

      <label>Colors (comma-separated):</label>
      <input
        type="text"
        name="colors"
        value={customer.preferences.colors.join(', ')}
        onChange={handlePreferencesChange}
      />

      <label>Designs (comma-separated):</label>
      <input
        type="text"
        name="designs"
        value={customer.preferences.designs.join(', ')}
        onChange={handlePreferencesChange}
      />

      <label>Purchase History (format: product,quantity,date):</label>
        <textarea
          name="purchaseHistory"
        value={customer.purchaseHistory
        .map(item => `${item.product}, ${item.quantity}, ${item.purchaseDate instanceof Date ? item.purchaseDate.toISOString().split('T')[0] : 'Invalid date'}`)
        .join('; ')}
        onChange={handlePurchaseHistoryChange}
        ></textarea>



      <button type="submit">{isEditing ? "Update Customer" : "Create Customer"}</button>
    </form>
  );
};

export default CustomerForm;
