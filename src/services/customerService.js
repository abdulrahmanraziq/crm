// src/services/customerService.js
const API_URL = "http://localhost:10000/api/customers";

export const getCustomers = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const deleteCustomer = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};


export const createCustomer = async (customerData) => {
    try {
      const res = await fetch('http://localhost:10000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  
  export const updateCustomer = async (id, customerData) => {
    try {
      const res = await fetch(`http://localhost:10000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };


  