import React from 'react';

const Customers = ({ customers, startEdit, handleDeleteCustomer}) => { // Ensure handleDelete is a prop
  console.log('handleDeleteCustomer prop:', handleDeleteCustomer);
  return (
    <div>
      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th> {/* Add actions for editing and deleting */}
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="5">No customers found.</td>
            </tr>
          ) : (
            customers.map(customer => (
              <tr key={customer._id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                  <button onClick={() => startEdit(customer)}>Edit</button>
                  <button 
                  type="button" 
                  className='btn btn-danger mt-3'  
                  onClick={() => handleDeleteCustomer(customer._id)}                  
                  >Delete</button> {/* Ensure handleDelete is used correctly */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
