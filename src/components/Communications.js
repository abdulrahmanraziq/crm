import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Communication.css'; 
import { Sidebar } from './Sidebar'; // Import Sidebar

const Communication = () => {
  const [customers, setCustomers] = useState([]); // Store all customers
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // Store selected customer's ID
  const [communications, setCommunications] = useState([]);
  const [newComm, setNewComm] = useState(''); // Hold new communication entry
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://crm-4-nojq.onrender.com/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Failed to load customers', error);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch communications for a specific customer when customerId changes
  useEffect(() => {
    if (!selectedCustomerId) return;

    const fetchCommunications = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://crm-4-nojq.onrender.com/api/customers/${selectedCustomerId}/communications`);
        setCommunications(response.data);
      } catch (error) {
        setError('Failed to load communications');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunications();
  }, [selectedCustomerId]);

  // Handle adding a new communication entry
  const handleAddCommunication = async () => {
    try {
      const response = await axios.post(`https://crm-4-nojq.onrender.com/api/customers/${selectedCustomerId}/communications`, {
        content: newComm,
      });
      setCommunications([...communications, response.data]); // Append new communication to the list
      setNewComm(''); // Clear input field
    } catch (error) {
      console.error('Error adding communication:', error);
    }
  };

  return (
    <div className="communication-section">
      {/* Add Sidebar here */}
      <Sidebar />

      <h3 className='mt-5'>Select Customer and View Communications</h3>

      {/* Dropdown to select a customer */}
      <select 
        value={selectedCustomerId || ''} 
        onChange={(e) => setSelectedCustomerId(e.target.value)}
      >
        <option value="">Select a customer...</option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.name} {/* Assuming each customer has a name field */}
          </option>
        ))}
      </select>

      {/* Show message if no customer is selected */}
      {!selectedCustomerId && <p>Select a customer to view their communications.</p>}

      {/* Show communications for selected customer */}
      {selectedCustomerId && (
        <>
          <h3>Customer Communications</h3>
          {loading && <p>Loading communications...</p>}
          {error && <p>{error}</p>}

          <ul>
            {communications.map((comm) => (
              <li key={comm._id}>{comm.content}</li>
            ))}
          </ul>

          {/* Form to add a new communication */}
          <div>
            <input
              type="text"
              value={newComm}
              onChange={(e) => setNewComm(e.target.value)}
              placeholder="Add new communication..."
            />
            <button onClick={handleAddCommunication}>Add</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Communication;
