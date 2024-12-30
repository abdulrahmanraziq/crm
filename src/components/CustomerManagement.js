import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Customers from './Customers.js';
import CustomerForm from './CustomerForm.js';
import Communication from './Communication'; // Import Communication component

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);               // Customers state
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Currently selected customer for edit or communication
  const [isEditing, setIsEditing] = useState(false);            // Whether a customer is being edited

  // Fetch all customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:10000/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Edit customer: Set the selected customer and activate edit mode
  const handleEditCustomer = (customerId) => {
    const customer = customers.find((c) => c._id === customerId);
    setSelectedCustomer(customer);
    setIsEditing(true);
  };

  // Delete customer: Handle the logic for deleting a customer and updating the UI
  const handleDeleteCustomer = async (customerId) => {
    console.log("handleDeleteCustomer called for ID:", customerId); // Log the customer ID
    try {
      const response = await axios.delete(`http://localhost:10000/api/customers/${customerId}`);
      
      if (response.status === 200) {
        // Update the customers state to remove the deleted customer
        setCustomers(customers.filter((customer) => customer._id !== customerId));
        alert('Customer deleted successfully');
        // Reset selected customer and editing mode if the deleted customer is the selected one
        if (selectedCustomer && selectedCustomer._id === customerId) {
          setSelectedCustomer(null);
          setIsEditing(false);
        }
      } else {
        alert(response.data.message || 'Error occurred while deleting customer.');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error occurred while deleting customer.');
    }
  };

  // Form submission handler: Reset selected customer and exit edit mode
  const handleFormSubmit = () => {
    setSelectedCustomer(null); // Clear selected customer after form submission
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Customer Management</h1>

      {/* Customer List Component */}
      <Customers
        customers={customers}
        startEdit={handleEditCustomer}
        handleDeleteCustomer={handleDeleteCustomer} // Pass handleDeleteCustomer as handleDeleteCustomer
      />

      {/* Customer Form Component */}
      <CustomerForm
        initialValues={selectedCustomer} // Pre-fill the form with selected customer details if editing
        isEditing={isEditing}            // Toggle editing mode
        onFormSubmit={handleFormSubmit}   // Handle form submission
      />

      {/* Communication Component - Display only if a customer is selected */}
      {selectedCustomer && (
        <div>
          <h2>Communications for {selectedCustomer.name}</h2>
          <Communication customerId={selectedCustomer._id} />
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
