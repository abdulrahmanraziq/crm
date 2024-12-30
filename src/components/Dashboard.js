import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import CustomerForm from './CustomerForm'; // Form for both create and edit
import Customers from './Customers'; // Import the CustomerList component
import { createCustomer, updateCustomer } from '../services/customerService';
import './Dashboard.css'; // Keep CSS for layout styling
import axios from 'axios';

const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customers, setCustomers] = useState([]); // State to hold the customer list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:10000/api/customers');
        setCustomers(response.data);
      } catch (error) {
        setError('Error fetching customers');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handler for creating a new customer
  const handleCreateCustomer = async (customerData) => {
    const result = await createCustomer(customerData);
    console.log('Customer created:', result);
    setCustomers([...customers, result]); // Update the customer list
  };

  // Handler for editing an existing customer
  const handleEditCustomer = async (customerData) => {
    const result = await updateCustomer(editingCustomer._id, customerData);
    console.log('Customer updated:', result);
    setCustomers(customers.map(customer => (customer._id === result._id ? result : customer))); // Update the customer list
    setIsEditing(false); // Return to create mode after editing
  };

  // Trigger the editing mode and set the selected customer for editing
  const startEdit = (customer) => {
    setEditingCustomer(customer);
    setIsEditing(true);
  };

  return (
    <div className="dashboard">
      <Sidebar /> {/* Sidebar remains unchanged */}

      <div className="main-content">
        {/* Display the Customer Form for both create and edit */}
        {isEditing ? (
          <CustomerForm
            onSubmit={handleEditCustomer}
            initialValues={editingCustomer}
            isEditing
          />
        ) : (
          <CustomerForm onSubmit={handleCreateCustomer} />
        )}

        {/* Customer List */}
        {loading ? (
          <div>Loading customers...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Customers customers={customers} startEdit={startEdit} />
        )}
        
        {/* Other dashboard content like reports or customer list */}
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
